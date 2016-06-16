import generateContentHash from './utils/generateContentHash'
import sortedStringify from './utils/sortedStringify'
import getFontFormat from './utils/getFontFormat'

import cssifyKeyframe from './utils/cssifyKeyframe'
import cssifyObject from './utils/cssifyObject'

export default function createRenderer(config = { }) {
  const renderer = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || [ '-webkit-', '-moz-' ],
    plugins: config.plugins || [ ],

    /**
     * clears the sheet's cache but keeps all listeners
     */
    clear() {
      renderer.fontFaces = ''
      renderer.keyframes = ''
      renderer.statics = ''
      renderer.rules = ''
      renderer.mediaRules = { }
      renderer.rendered = { }
      renderer.base = { }
      renderer.ids = [ ]

      // emit changes to notify subscribers
      renderer._emitChange()
    },

    /**
     * renders a new rule variation and caches the result
     *
     * @param {Function} rule - rule which gets rendered
     * @param {Object?} props - properties used to render
     * @return {string} className to reference the rendered rule
     */
    renderRule(rule, props = { }) {
      // rendering a rule for the first time
      // will create an ID reference
      if (renderer.ids.indexOf(rule) < 0) {
        renderer.ids.push(rule)

        // directly render the static base style to be able
        // to diff future dynamic style with those
        renderer.renderRule(rule, { })
      }

      // uses the reference ID and the props to generate an unique className
      const ruleId = renderer.ids.indexOf(rule)
      const className = 'c' + ruleId + renderer._generatePropsReference(props)

      // only if the cached rule has not already been rendered
      // with a specific set of properties it actually renders
      if (!renderer.rendered.hasOwnProperty(className)) {
        const style = renderer._processStyle(rule(props))
        renderer._renderStyle(className, style, renderer.base[ruleId])

        renderer.rendered[className] = renderer._didChange

        if (renderer._didChange) {
          renderer._didChange = false
          renderer._emitChange()
        }

        // keep static style to diff dynamic onces later on
        if (className === 'c' + ruleId) {
          renderer.base[ruleId] = style
        }
      }

      const baseClassName = 'c' + ruleId
      if (!renderer.rendered[className]) {
        return baseClassName
      }

      // returns either the base className or both the base and the dynamic part
      return className !== baseClassName ? baseClassName + ' ' + className : className
    },

    /**
     * renders a new keyframe variation and caches the result
     *
     * @param {Keyframe} keyframe - Keyframe which gets rendered
     * @param {Object?} props - properties used to render
     * @return {string} animationName to reference the rendered keyframe
     */
    renderKeyframe(keyframe, props = { }) {
      // rendering a Keyframe for the first time
      // will create cache entries and an ID reference
      if (renderer.ids.indexOf(keyframe) < 0) {
        renderer.ids.push(keyframe)
      }

      const propsReference = renderer._generatePropsReference(props)
      const animationName = 'k' + renderer.ids.indexOf(keyframe) + propsReference

      // only if the cached keyframe has not already been rendered
      // with a specific set of properties it actually renders
      if (!renderer.rendered.hasOwnProperty(animationName)) {
        const processedKeyframe = renderer._processStyle(keyframe(props))
        const css = cssifyKeyframe(processedKeyframe, animationName, renderer.keyframePrefixes)
        renderer.rendered[animationName] = true
        renderer.keyframes += css
        renderer._emitChange()
      }

      return animationName
    },

    /**
     * renders a new font-face and caches it
     *
     * @param {FontFace} fontFace - fontFace which gets rendered
     * @return {string} fontFamily reference
     */
    renderFont(family, files, properties = { }) {
      if (!renderer.rendered.hasOwnProperty(family)) {
        const fontFace = {
          fontFamily: '\'' + family + '\'',
          src: files.map(src => 'url(\'' + src + '\') format(\'' + getFontFormat(src) + '\')').join(',')
        }

        const fontProperties = [ 'fontVariant', 'fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange' ]
        Object.keys(properties).filter(prop => fontProperties.indexOf(prop) > -1).forEach(fontProp => fontFace[fontProp] = properties[fontProp])

        const css = '@font-face{' + cssifyObject(fontFace) + '}'
        renderer.rendered[family] = true
        renderer.fontFaces += css
        renderer._emitChange()
      }

      return family
    },

    /**
     * renders static style and caches them
     *
     * @param {string|Object} style - static style to be rendered
     * @param {string?} selector - selector used to render the styles
     * @return {string} rendered CSS output
     */
    renderStatic(style, selector) {
      const reference = typeof style === 'string' ? style : selector

      if (!renderer.rendered.hasOwnProperty(reference)) {
        if (typeof style === 'string') {
          // remove new lines from template strings
          renderer.statics += style.replace(/\s{2,}/g, '')
        } else {
          renderer.statics += selector + '{' + cssifyObject(renderer._processStyle(style)) + '}'
        }

        renderer.rendered[reference] = true
        renderer._emitChange()
      }
    },

    /**
     * renders all cached styles into a single valid CSS string
     * clusters media query styles into groups to reduce output size

     * @return single concatenated CSS string
     */
    renderToString() {
      let css = renderer.fontFaces + renderer.statics + renderer.rules

      for (let media in renderer.mediaRules) {
        css += '@media ' + media + '{' + renderer.mediaRules[media] + '}'
      }

      return css + renderer.keyframes
    },

    /**
     * Adds a new subscription to get notified on every rerender
     *
     * @param {Function} callback - callback function which will be executed
     * @return {Object} equivalent unsubscribe method
     */
    subscribe(callback) {
      renderer.listeners.push(callback)
      return {
        unsubscribe: () => renderer.listeners.splice(renderer.listeners.indexOf(callback), 1)
      }
    },

    /**
     * calls each listener with the current CSS markup of all caches
     * gets only called if the markup actually changes
     *
     * @param {Function} callback - callback function which will be executed
     * @return {Object} equivalent unsubscribe method
     */
    _emitChange() {
      const css = renderer.renderToString()
      renderer.listeners.forEach(listener => listener(css))
    },

    /**
     * generates an unique reference id by content hashing props
     *
     * @param {Object} props - props that get hashed
     * @return {string} reference - unique props reference
     */
    _generatePropsReference(props) {
      return generateContentHash(sortedStringify(props))
    },

    /**
     * pipes a style object through a list of plugins
     *
     * @param {Object} style - style object to process
     * @return {Object} processed style
     */
    _processStyle(style) {
      return renderer.plugins.reduce((processedStyle, plugin) => plugin(processedStyle), style)
    },


    /**
     * iterates a style object and renders each rule to the cache
     *
     * @param {string} className - className reference to be rendered to
     * @param {Object} style - style object which is rendered
     * @param {Object`} base - base style subset for diffing
     */
    _renderStyle(className, style, base = { }, pseudo = '', media = '') {
      const ruleset = Object.keys(style).reduce((ruleset, property) => {
        const value = style[property]
        // recursive object iteration in order to render
        // pseudo class and media class declarations
        if (value instanceof Object && !Array.isArray(value)) {
          if (property.charAt(0) === ':') {
            renderer._renderStyle(className, value, base[property], pseudo + property, media)
          } else if (property.substr(0, 6) === '@media') {
            // combine media query rules with an `and`
            const query = property.slice(6).trim()
            const combinedMedia = media.length > 0 ? media + ' and ' + query : query
            renderer._renderStyle(className, value, base[property], pseudo, combinedMedia)
          }
        } else {
          // diff styles with the base styles to only extract dynamic styles
          if (value !== undefined && !base.hasOwnProperty(property) || base[property] !== value) {
            // remove concatenated string values including `undefined`
            if (typeof value === 'string' && value.indexOf('undefined') > -1) {
              return ruleset
            }
            ruleset[property] = value
          }
        }
        return ruleset
      }, { })

      // add styles to the cache
      if (Object.keys(ruleset).length > 0) {
        const css = '.' + className + pseudo + '{' + cssifyObject(ruleset) + '}'
        renderer._didChange = true

        if (media.length > 0) {
          if (!renderer.mediaRules.hasOwnProperty(media)) {
            renderer.mediaRules[media] = ''
          }

          renderer.mediaRules[media] += css
        } else {
          renderer.rules += css
        }
      }
    }
  }

  // initial setup
  renderer.keyframePrefixes.push('')
  renderer.clear()

  return renderer
}
