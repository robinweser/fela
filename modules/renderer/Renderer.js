import generateContentHash from './utils/generateContentHash'
import sortedStringify from './utils/sortedStringify'
import getFontFormat from './utils/getFontFormat'

import cssifyKeyframe from './utils/cssifyKeyframe'
import cssifyObject from './utils/cssifyObject'

export default function Renderer(config = { }) {
  const renderer = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || [ '-webkit-', '-moz-' ],
    plugins: config.plugins || [ ],

    /**
     * clears the sheet's cache but keeps all listeners
     */
    clear() {
      this.fontFaces = ''
      this.keyframes = ''
      this.statics = ''
      this.rules = ''
      this.mediaRules = { }
      this.rendered = { }
      this.base = { }
      this.ids = [ ]

      // emit changes to notify subscribers
      this._emitChange()
    },

    /**
     * renders a new rule variation and caches the result
     *
     * @param {Function} rule - rule which gets rendered
     * @param {Object?} props - properties used to render
     * @param {Function[]?} plugins - array of plugins to process style
     * @return {string} className to reference the rendered rule
     */
    renderRule(rule, props = { }) {
      // rendering a rule for the first time
      // will create an ID reference
      if (this.ids.indexOf(rule) < 0) {
        this.ids.push(rule)

        // directly render the static base style to be able
        // to diff future dynamic style with those
        this.renderRule(rule, { })
      }

      // uses the reference ID and the props to generate an unique className
      const ruleId = this.ids.indexOf(rule)
      const className = 'c' + ruleId + this._generatePropsReference(props)

      // only if the cached rule has not already been rendered
      // with a specific set of properties it actually renders
      if (!this.rendered.hasOwnProperty(className)) {
        const style = this._processStyle(rule(props))
        this._renderStyle(className, style, this.base[ruleId])

        this.rendered[className] = this._didChange

        if (this._didChange) {
          this._didChange = false
          this._emitChange()
        }

        // keep static style to diff dynamic onces later on
        if (className === 'c' + ruleId) {
          this.base[ruleId] = style
        }
      }

      const baseClassName = 'c' + ruleId
      if (!this.rendered[className]) {
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
      if (this.ids.indexOf(keyframe) < 0) {
        this.ids.push(keyframe)
      }

      const propsReference = this._generatePropsReference(props)
      const animationName = 'k' + this.ids.indexOf(keyframe) + propsReference

      // only if the cached keyframe has not already been rendered
      // with a specific set of properties it actually renders
      if (!this.rendered.hasOwnProperty(animationName)) {
        const processedKeyframe = this._processStyle(keyframe(props))
        const css = cssifyKeyframe(processedKeyframe, animationName, this.keyframePrefixes)
        this.rendered[animationName] = true
        this.keyframes += css
        this._emitChange()
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
      if (!this.rendered.hasOwnProperty(family)) {
        const fontFace = {
          fontFamily: '\'' + family + '\'',
          src: files.map(src => 'url(\'' + src + '\') format(\'' + getFontFormat(src) + '\')').join(',')
        }

        const fontProperties = [ 'fontVariant', 'fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange' ]
        Object.keys(properties).filter(prop => fontProperties.indexOf(prop) > -1).forEach(fontProp => fontFace[fontProp] = properties[fontProp])

        const css = '@font-face{' + cssifyObject(fontFace) + '}'
        this.rendered[family] = true
        this.fontFaces += css
        this._emitChange()
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

      if (!this.rendered.hasOwnProperty(reference)) {
        if (typeof style === 'string') {
          // remove new lines from template strings
          this.statics += style.replace(/\s{2,}/g, '')
        } else {
          this.statics += selector + '{' + cssifyObject(this._processStyle(style)) + '}'
        }

        this.rendered[reference] = true
        this._emitChange()
      }
    },

    /**
     * renders all cached styles into a single valid CSS string
     * clusters media query styles into groups to reduce output size

     * @return single concatenated CSS string
     */
    renderToString() {
      let css = this.fontFaces + this.statics + this.rules

      for (let media in this.mediaRules) {
        css += '@media ' + media + '{' + this.mediaRules[media] + '}'
      }

      return css + this.keyframes
    },

    /**
     * Adds a new subscription to get notified on every rerender
     *
     * @param {Function} callback - callback function which will be executed
     * @return {Object} equivalent unsubscribe method
     */
    subscribe(callback) {
      this.listeners.push(callback)
      return {
        unsubscribe: () => this.listeners.splice(this.listeners.indexOf(callback), 1)
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
      const css = this.renderToString()
      this.listeners.forEach(listener => listener(css))
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
      return this.plugins.reduce((processedStyle, plugin) => plugin(processedStyle), style)
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
            this._renderStyle(className, value, base[property], pseudo + property, media)
          } else if (property.substr(0, 6) === '@media') {
            // combine media query rules with an `and`
            const query = property.slice(6).trim()
            const combinedMedia = media.length > 0 ? media + ' and ' + query : query
            this._renderStyle(className, value, base[property], pseudo, combinedMedia)
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
        this._didChange = true

        if (media.length > 0) {
          if (!this.mediaRules.hasOwnProperty(media)) {
            this.mediaRules[media] = ''
          }

          this.mediaRules[media] += css
        } else {
          this.rules += css
        }
      }
    }
  }

  // initial setup
  renderer.keyframePrefixes.push('')
  renderer.clear()

  return renderer
}
