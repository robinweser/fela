import generateContentHash from './utils/generateContentHash'
import sortedStringify from './utils/sortedStringify'
import getFontFormat from './utils/getFontFormat'

import cssifyKeyframe from './utils/cssifyKeyframe'
import cssifyObject from './utils/cssifyObject'

export default function Renderer(config = { }) {
  const r = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || [ '-webkit-', '-moz-' ],
    plugins: config.plugins || [ ],

    /**
     * clears the sheet's cache but keeps all listeners
     */
    clear() {
      r.fontFaces = ''
      r.keyframes = ''
      r.statics = ''
      r.rules = ''
      r.mediaRules = { }
      r.rendered = { }
      r.base = { }
      r.ids = [ ]

      // emit changes to notify subscribers
      r._emitChange()
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
      if (r.ids.indexOf(rule) < 0) {
        r.ids.push(rule)

        // directly render the static base style to be able
        // to diff future dynamic style with those
        r.renderRule(rule, { })
      }

      // uses the reference ID and the props to generate an unique className
      const ruleId = r.ids.indexOf(rule)
      const className = 'c' + ruleId + r._generatePropsReference(props)

      // only if the cached rule has not already been rendered
      // with a specific set of properties it actually renders
      if (!r.rendered.hasOwnProperty(className)) {
        const style = r._processStyle(rule(props))
        r._renderStyle(className, style, r.base[ruleId])

        r.rendered[className] = r._didChange

        if (r._didChange) {
          r._didChange = false
          r._emitChange()
        }

        // keep static style to diff dynamic onces later on
        if (className === 'c' + ruleId) {
          r.base[ruleId] = style
        }
      }

      const baseClassName = 'c' + ruleId
      if (!r.rendered[className]) {
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
      if (r.ids.indexOf(keyframe) < 0) {
        r.ids.push(keyframe)
      }

      const propsReference = r._generatePropsReference(props)
      const animationName = 'k' + r.ids.indexOf(keyframe) + propsReference

      // only if the cached keyframe has not already been rendered
      // with a specific set of properties it actually renders
      if (!r.rendered.hasOwnProperty(animationName)) {
        const processedKeyframe = r._processStyle(keyframe(props))
        const css = cssifyKeyframe(processedKeyframe, animationName, r.keyframePrefixes)
        r.rendered[animationName] = true
        r.keyframes += css
        r._emitChange()
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
      if (!r.rendered.hasOwnProperty(family)) {
        const fontFace = {
          fontFamily: '\'' + family + '\'',
          src: files.map(src => 'url(\'' + src + '\') format(\'' + getFontFormat(src) + '\')').join(',')
        }

        const fontProperties = [ 'fontVariant', 'fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange' ]
        Object.keys(properties).filter(prop => fontProperties.indexOf(prop) > -1).forEach(fontProp => fontFace[fontProp] = properties[fontProp])

        const css = '@font-face{' + cssifyObject(fontFace) + '}'
        r.rendered[family] = true
        r.fontFaces += css
        r._emitChange()
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

      if (!r.rendered.hasOwnProperty(reference)) {
        if (typeof style === 'string') {
          // remove new lines from template strings
          r.statics += style.replace(/\s{2,}/g, '')
        } else {
          r.statics += selector + '{' + cssifyObject(r._processStyle(style)) + '}'
        }

        r.rendered[reference] = true
        r._emitChange()
      }
    },

    /**
     * renders all cached styles into a single valid CSS string
     * clusters media query styles into groups to reduce output size

     * @return single concatenated CSS string
     */
    renderToString() {
      let css = r.fontFaces + r.statics + r.rules

      for (let media in r.mediaRules) {
        css += '@media ' + media + '{' + r.mediaRules[media] + '}'
      }

      return css + r.keyframes
    },

    /**
     * Adds a new subscription to get notified on every rerender
     *
     * @param {Function} callback - callback function which will be executed
     * @return {Object} equivalent unsubscribe method
     */
    subscribe(callback) {
      r.listeners.push(callback)
      return {
        unsubscribe: () => r.listeners.splice(r.listeners.indexOf(callback), 1)
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
      const css = r.renderToString()
      r.listeners.forEach(listener => listener(css))
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
      return r.plugins.reduce((processedStyle, plugin) => plugin(processedStyle), style)
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
            r._renderStyle(className, value, base[property], pseudo + property, media)
          } else if (property.substr(0, 6) === '@media') {
            // combine media query rules with an `and`
            const query = property.slice(6).trim()
            const combinedMedia = media.length > 0 ? media + ' and ' + query : query
            r._renderStyle(className, value, base[property], pseudo, combinedMedia)
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
        r._didChange = true

        if (media.length > 0) {
          if (!r.mediaRules.hasOwnProperty(media)) {
            r.mediaRules[media] = ''
          }

          r.mediaRules[media] += css
        } else {
          r.rules += css
        }
      }
    }
  }

  // initial setup
  r.keyframePrefixes.push('')
  r.clear()

  return r
}
