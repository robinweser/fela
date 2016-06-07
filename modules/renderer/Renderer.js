import generateContentHash from './utils/generateContentHash'
import sortedStringify from './utils/sortedStringify'
import getFontFormat from './utils/getFontFormat'

import validateStyle from './utils/validateStyle'
import processStyle from './utils/processStyle'
import cssifyKeyframe from './utils/cssifyKeyframe'
import cssifyObject from './utils/cssifyObject'

import isMediaQuery from './utils/isMediaQuery'
import isPseudoClass from './utils/isPseudoClass'

export default class Renderer {
  /**
   * StyleSheet is a low-level container to cache Selectors
   * Keyframes and FontFaces which optimizes style
   */
  constructor(config = { }) {
    this.listeners = [ ]
    this.keyframePrefixes = config.keyframePrefixes || [ '-webkit-', '-moz-' ]
    this.keyframePrefixes.push('')
    this.plugins = config.plugins || [ ]
    this.clear()
  }

  /**
   * clears the sheet's cache but keeps all listeners
   */
  clear() {
    this.fontFaces = ''
    this.keyframes = ''
    this.statics = ''
    this.selectors = ''
    this.mediaSelectors = { }
    this.rendered = { }
    this.base = { }
    this.ids = [ ]

    // emit changes to notify subscribers
    this._emitChange()
  }

  /**
   * renders a new selector variation and caches the result
   *
   * @param {Selector|Function} selector - Selector which gets rendered
   * @param {Object?} props - properties used to render
   * @param {Function[]?} plugins - array of plugins to process style
   * @return {string} className to reference the rendered selector
   */
  render(selector, props = { }) {
    // rendering a Selector for the first time
    // will create an ID reference
    if (this.ids.indexOf(selector) < 0) {
      this.ids.push(selector)

      // directly render the static base style to be able
      // to diff future dynamic style with those
      this.render(selector, { })
    }

    // uses the reference ID and the props to generate an unique className
    const selectorId = this.ids.indexOf(selector)
    const className = 'c' + selectorId + this._generatePropsReference(props)

    // only if the cached selector has not already been rendered
    // with a specific set of properties it actually renders
    if (!this.rendered.hasOwnProperty(className)) {
      // get the render method of either class-like selectors
      // or pure functional selectors without a constructor
      const pluginInterface = {
        plugins: this.plugins,
        processStyle: processStyle,
        style: selector(props),
        props: props
      }

      const style = validateStyle(processStyle(pluginInterface))
      this._renderStyle(className, style, this.base[selectorId])

      this.rendered[className] = this._didChange

      if (this._didChange) {
        this._didChange = false
        this._emitChange()
      }

      // keep static style to diff dynamic onces later on
      if (className === 'c' + selectorId) {
        this.base[selectorId] = style
      }
    }

    const baseClassName = 'c' + selectorId
    if (!this.rendered[className]) {
      return baseClassName
    }

    // returns either the base className or both the base and the dynamic part
    return className !== baseClassName ? baseClassName + ' ' + className : className
  }

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

    // only if the cached selector has not already been rendered
    // with a specific set of properties it actually renders
    if (!this.rendered.hasOwnProperty(animationName)) {
      const pluginInterface = {
        plugins: this.plugins,
        processStyle: processStyle,
        style: keyframe(props),
        props: props
      }

      const processedKeyframe = processStyle(pluginInterface)
      const css = cssifyKeyframe(processedKeyframe, animationName, this.keyframePrefixes)
      this.rendered[animationName] = true
      this.keyframes += css
      this._emitChange()
    }

    return animationName
  }

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
  }

  /**
   * renders static style and caches them
   *
   * @param {string|Object} style - static style to be rendered
   * @param {Function[]?} plugins - additional plugins
   * @return {string} rendered CSS output
   */
  renderStatic(style) {
    const ref = typeof style === 'string' ? style : this._generatePropsReference(style)

    if (!this.rendered.hasOwnProperty(ref)) {
      let css = ''

      if (typeof style === 'string') {
        // remove new lines from template strings
        css = style.replace(/\s+/g, '')
      } else {
        Object.keys(style).forEach(selector => {
          const pluginInterface = {
            plugins: this.plugins,
            processStyle: processStyle,
            style: style[selector]
          }

          css += selector + '{' + cssifyObject(processStyle(pluginInterface)) + '}'
        })
      }

      this.rendered[ref] = true
      this.statics += css
      this._emitChange()
    }
  }

  /**
   * renders all cached styles into a single valid CSS string
   * clusters media query styles into groups to reduce output size
  
   * @return single concatenated CSS string
   */
  renderToString() {
    let css = this.fontFaces + this.statics + this.selectors

    for (var media in this.mediaSelectors) {
      css += '@media ' + media + '{' + this.mediaSelectors[media] + '}'
    }

    return css + this.keyframes
  }

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
  }

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
  }

  /**
   * generates an unique reference id by content hashing props
   *
   * @param {Object} props - props that get hashed
   * @return {string} reference - unique props reference
   */
  _generatePropsReference(props) {
    return generateContentHash(sortedStringify(props))
  }

  /**
   * iterates a style object and renders each selector to the cache
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
        if (isPseudoClass(property)) {
          this._renderStyle(className, value, base[property], pseudo + property, media)
        } else if (isMediaQuery(property)) {
          // combine media query selectors with an `and`
          const query = property.slice(6).trim()
          const combinedMedia = media.length > 0 ? media + ' and ' + query : query
          this._renderStyle(className, value, base[property], pseudo, combinedMedia)
        }
      } else {
        // diff styles with the base styles to only extract dynamic styles
        if (!base.hasOwnProperty(property) || base[property] !== value) {
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
        if (!this.mediaSelectors.hasOwnProperty(media)) {
          this.mediaSelectors[media] = ''
        }

        this.mediaSelectors[media] += css
      } else {
        this.selectors += css
      }
    }
  }
}