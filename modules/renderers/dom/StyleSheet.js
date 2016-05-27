import cssifyObject from '../../utils/cssifyObject'
import generateContentHash from '../../utils/generateContentHash'
import sortedStringify from '../../utils/sortedStringify'

export default class StyleSheet {
  /**
   * StyleSheet is a low-level container to cache Selectors
   * Keyframes and FontFaces which optimizes styles
   */
  constructor(config = { }) {
    this.listeners = new Set()
    this.keyframePrefixes = config.keyframePrefixes || [ '-webkit-', '-moz-', '' ]
    this.plugins = config.plugins || [ ]
    this._init()
  }

  /**
   * clears the sheet's cache but keeps all listeners
   */
  clear() {
    this._init()
  }

  /**
   * renders all cached selector styles into a single valid CSS string
   * clusters media query styles into groups to reduce output size
   */
  renderToString() {
    let css = ''

    this.fontFaces.forEach(fontFace => css += fontFace)
    this.keyframes.forEach((variation, keyframe) => {
      variation.forEach((markup, propsReference) => css += markup)
    })

    css += this._renderCache(this.cache)
    this.mediaCache.forEach((cache, media) => {
      css += '@media(' + media + '){' + this._renderCache(cache) + '}'
    })

    return css
  }

  /**
   * Adds a new subscription to get notified on every rerender
   *
   * @param {Function} callback - callback function which will be executed
   * @return {Object} equivalent unsubscribe method
   */
  subscribe(callback) {
    this.listeners.add(callback)
    return {
      unsubscribe: () => this.listeners.delete(callback)
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
   * initializes the stylesheet by setting up the caches
   */
  _init() {
    this.cache = new Map()
    this.mediaCache = new Map()
    this.fontFaces = new Set()
    this.keyframes = new Map()
    this.ids = new Map()
    this._counter = -1
  }

  /**
   * renders a new font-face and caches it
   *
   * @param {FontFace} fontFace - fontFace which gets rendered
   * @return {string} fontFamily reference
   */
  _renderFontFace(fontFace) {
    if (!this.fontFaces.has(fontFace)) {
      const renderedFontFace = '@font-face {' + cssifyObject(fontFace.render()) + '}'
      this.fontFaces.add(renderedFontFace)
      this._emitChange()
    }

    return fontFace.fontFamily
  }

  /**
   * renders a new keyframe variation and caches the result
   *
   * @param {Keyframe} keyframe - Keyframe which gets rendered
   * @param {Object?} props - properties used to render
   * @param {Function[]?} plugins - array of plugins to process styles
   * @return {string} animationName to reference the rendered keyframe
   */
  _renderKeyframeVariation(keyframe, props = { }, plugins = []) {
    // rendering a Keyframe for the first time
    // will create cache entries and an ID reference
    if (!this.keyframes.has(keyframe)) {
      this.keyframes.set(keyframe, new Map())
      this.ids.set(keyframe, ++this._counter)
    }

    const cachedKeyframe = this.keyframes.get(keyframe)
    const propsReference = this._generatePropsReference(props)
    const animationName = 'k' + this.ids.get(keyframe) + propsReference

    // only if the cached selector has not already been rendered
    // with a specific set of properties it actually renders
    if (!cachedKeyframe.has(propsReference)) {
      const pluginInterface = {
        plugins: this.plugins.concat(plugins),
        processStyles: this._processStyles,
        styles: keyframe.render(props),
        props: props
      }

      const processedKeyframe = this._processStyles(pluginInterface)
      cachedKeyframe.set(propsReference, this._renderKeyframe(processedKeyframe, animationName))
      this._emitChange()
    }

    return animationName
  }

  /**
   * renders a new selector variation and caches the result
   *
   * @param {Selector|Function} selector - Selector which gets rendered
   * @param {Object?} props - properties used to render
   * @param {Function[]?} plugins - array of plugins to process styles
   * @return {string} className to reference the rendered selector
   */
  _renderSelectorVariation(selector, props = { }, plugins = []) {
    const isFunctionalSelector = selector instanceof Function
    const isMediaSelector = !isFunctionalSelector && selector.renderMedia instanceof Function
    // rendering a Selector for the first time
    // will create cache entries and an ID reference
    if (!this.cache.has(selector)) {
      this.ids.set(selector, ++this._counter)
      this.cache.set(selector, new Map())
      // iterate all used media strings to create
      // selector caches for each media as well
      if (isMediaSelector) {
        selector.mediaStrings.forEach(media => {
          if (!this.mediaCache.has(media)) {
            this.mediaCache.set(media, new Map())
          }
          this.mediaCache.get(media).set(selector, new Map())
        })
      }
      // directly render the static base styles to be able
      // to diff future dynamic styles with those
      this._renderSelectorVariation(selector, { }, plugins)
    }

    const cachedSelector = this.cache.get(selector)
    const propsReference = this._generatePropsReference(props)
    // uses the reference ID and the props to generate an unique className
    const className = 'c' + this.ids.get(selector) + propsReference

    // only if the cached selector has not already been rendered
    // with a specific set of properties it actually renders
    if (!cachedSelector.has(propsReference)) {
      // get the render method of either class-like selectors
      // or pure functional selectors without a constructor
      const pluginInterface = {
        plugins: this.plugins.concat(plugins),
        processStyles: this._processStyles,
        styles: isFunctionalSelector ? selector(props) : selector.render(props),
        props: props
      }

      const preparedStyles = this._prepareStyles(pluginInterface, cachedSelector.get('static'), propsReference)
      cachedSelector.set(propsReference, this._renderStyles(preparedStyles, className))

      // keep static styles to diff dynamic onces later on
      if (propsReference === '') {
        cachedSelector.set('static', preparedStyles)
      }

      if (isMediaSelector) {
        selector.mediaStrings.forEach(media => {
          const cachedMediaSelector = this.mediaCache.get(media).get(selector)

          const mediaPluginInterface = {
            ...pluginInterface,
            styles: selector.renderMedia(props, media),
            media: media
          }

          const preparedMediaStyles = this._prepareStyles(mediaPluginInterface, cachedMediaSelector.get('static'), propsReference)
          cachedMediaSelector.set(propsReference, this._renderStyles(preparedMediaStyles, className))

          // keep static styles to diff dynamic onces later on
          if (propsReference === '') {
            cachedMediaSelector.set('static', preparedMediaStyles)
          }
        })
      }
      // emit changes as the styles stack changed
      this._emitChange()
    }

    // returns either the base className or both the base and the dynamic part
    const baseClassName = 'c' + this.ids.get(selector)
    return className !== baseClassName ? baseClassName + ' ' + className : className
  }

  /**
   * executes each plugin using a predefined plugin interface
   *
   * @param {Object} pluginInterface - interface containing relevant processing data
   * @return {Object} processed styles
   */
  _processStyles(pluginInterface) {
    let { plugins, styles } = pluginInterface
    // pipes each plugin by passes the plugin interface
    // NOTE: as the styles are passed directly they're editable
    // therefore the plugin order might matter
    plugins.forEach(plugin => styles = plugin(pluginInterface))
    return styles
  }

  /**
   * extracts all dynamic styles by diffing with the static base styles
   *
   * @param {Object} styles - dynamic styles
   * @param {Object} base - static base styles to diff
   * @return {Object} encapsulated dynamic styles
   */
  _extractDynamicStyles(styles, base) {
    Object.keys(styles).forEach(property => {
      const value = styles[property]
      if (value instanceof Object && !Array.isArray(value)) {
        styles[property] = _extractDynamicStyles(styles[property], base[property])
        if (Object.keys(styles[property]).length === 0) {
          delete styles[property]
        }
      } else if (base.hasOwnProperty(property)) {
        delete styles[property]
      }
    })

    return styles
  }


  /**
   * removes every invalid property except pseudo class objects
   *
   * @param {Object} styles - styles to be validated
   * @return {Object} validated styles
   */
  _validateStyles(styles) {
    Object.keys(styles).forEach(property => {
      const value = styles[property]
      if (value instanceof Object && !Array.isArray(value)) {
        styles[property] = property.charAt(0) === ':' ? this._validateStyles(value) : {}
        if (Object.keys(styles[property]).length === 0) {
          delete styles[property]
        }
      } else if (typeof value !== 'string' && typeof value !== 'number') {
        delete styles[property]
      }
    })

    return styles
  }

  /**
   * flattens nested pseudo classes
   * removes all invalid properties that are not either a string or a number
   *
   * @param {Object} styles - dynamic styles
   * @return {Object} flat and validated styles
   */
  _splitPseudoClasses(styles, pseudo = '', out = { }) {
    Object.keys(styles).forEach(property => {
      const value = styles[property]
      if (value instanceof Object && !Array.isArray(value)) {
        this._splitPseudoClasses(value, pseudo + property, out)
      } else {
        if (!out[pseudo]) {
          out[pseudo] = { }
        }
        // add properties to pseudo maps
        out[pseudo][property] = value
      }
    })

    return out
  }

  /**
   *  processes, flattens, normalizes and diffs styles
   *
   * @param {Object} pluginInterface - plugin interface to process styles
   * @param {Object} baseStyles - static base styles
   * @return {Object} processed styles
   */
  _prepareStyles(pluginInterface, baseStyles, propsReference) {
    const processedStyles = this._processStyles(pluginInterface)
    const validatedStyles = this._validateStyles(processedStyles)

    // only diff and extract dynamic styles
    // if not actually rendering the base styles
    if (propsReference !== '') {
      return this._extractDynamicStyles(validatedStyles, baseStyles)
    }

    return validatedStyles
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
   * renders styles into a CSS string
   *
   * @param {Object} styles - prepared styles with pseudo keys
   * @param {string} className - className reference to render
   * @return {string} valid CSS string
   */
  _renderStyles(styles, className) {
    const splitStyles = this._splitPseudoClasses(styles)

    return Object.keys(splitStyles).reduce((css, pseudo) => {
      return css + '.' + className + pseudo + '{' + cssifyObject(splitStyles[pseudo]) + '}'
    }, '')
  }

  /**
   * renders keyframes into a CSS string with all prefixes
   *
   * @param {Object} frames - validated frame declarations
   * @param {string} animationName - animation reference naming
   * @return {string} valid CSS string
   */
  _renderKeyframe(frames, animationName) {
    const keyframe = Object.keys(frames).reduce((css, percentage) => {
      return css + percentage + '{' + cssifyObject(this._validateStyles(frames[percentage])) + '}'
    }, '')

    return this.keyframePrefixes.reduce((css, prefix) => {
      return css + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}'
    }, '')
  }

  /**
   * renders a whole cache into a single CSS string
   *
   * @param {Map} cache - cache including all selector variations
   * @return {string} valid CSS string
   */
  _renderCache(cache) {
    let css = ''

    cache.forEach((variation, selector) => {
      variation.forEach((markup, propsReference) => {
        if (propsReference !== 'static') {
          css += markup
        }
      })
    })

    return css
  }
}
