import cssifyObject from '../../utils/cssifyObject'
import generateContentHash from '../../utils/generateContentHash'
import sortedStringify from '../../utils/sortedStringify'

export default class StyleSheet {
  /**
   * StyleSheet is a low-level Selector container
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
    let css = this._renderCache(this.cache)
    this.mediaCache.forEach((cache, media) => {
      css += '@media(' + media + '){' + this._renderCache(cache) + '}'
    })
    this.fonts.forEach(font => css += '@font-face {' + cssifyObject(font) + '}')
    this.keyframes.forEach((variation, keyframe) => {
      this.keyframePrefixes.forEach(prefix => {
        const id = this.ids.get(keyframe)
        variation.forEach((frames, propsReference) => {
          const animationName = 'k' + this.ids.get(keyframe) + (propsReference !== 's' ? '-' + propsReference : '')
          css += '@' + prefix + 'keyframes ' + animationName + '{'
          Object.keys(frames).forEach(frame => {
            css += frame + '{' + cssifyObject(frames[frame]) + '}'
          })
          css += '}'
        })
      })
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
    this.fonts = new Set()
    this.keyframes = new Map()
    this.ids = new Map()
    this._counter = -1
  }

  _renderFontFace(font) {
    if (!this.fonts.has(font)) {
      this.fonts.add(font.render())
      this._emitChange()
    }

    return font.fontFamily
  }

  _renderKeyframeVariation(keyframe, props = { }, plugins = []) {
    if (!this.keyframes.has(keyframe)) {
      this.keyframes.set(keyframe, new Map())
      this.ids.set(keyframe, ++this._counter)
    }

    const cachedKeyframe = this.keyframes.get(keyframe)
    const propsReference = this._generatePropsReference(props)

    if (!cachedKeyframe.has(propsReference)) {
      const pluginInterface = {
        plugins: this.plugins.concat(plugins),
        processStyles: this._processStyles,
        styles: keyframe.render(props),
        props: props
      }

      cachedKeyframe.set(propsReference, this._processStyles(pluginInterface))
      this._emitChange()
    }

    return 'k' + this.ids.get(keyframe) + (propsReference !== 's' ? '-' + propsReference : '')
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
      this._renderSelectorVariation(selector, { }, plugins)
    }

    const cachedSelector = this.cache.get(selector)
    const propsReference = this._generatePropsReference(props)
    // uses the reference ID and the props to generate an unique className
    const className = this._renderClassName(this.ids.get(selector), propsReference)
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

      cachedSelector.set(propsReference, this._prepareStyles(pluginInterface, cachedSelector.get('s')))

      if (isMediaSelector) {
        selector.mediaStrings.forEach(media => {
          const cachedMediaSelector = this.mediaCache.get(media).get(selector)

          pluginInterface.styles = selector.renderMedia(props, media)
          pluginInterface.media = media

          cachedMediaSelector.set(propsReference, this._prepareStyles(pluginInterface, cachedMediaSelector.get('s')))
        })
      }
      // emit changes as the styles stack changed
      this._emitChange()
    }

    // returns either the base className or both the base and the dynamic part
    return propsReference !== 's' ? this._renderClassName(this.ids.get(selector), 's') + ' ' + className : className
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
   * @param {Object} baseStyles - static base styles to diff
   * @return {Object} encapsulated dynamic styles
   */
  _extractDynamicStyles(styles, baseStyles = { }) {
    Object.keys(styles).forEach(pseudo => {
      const declarations = styles[pseudo]
      // only iterate if base styles even has the pseudo
      if (baseStyles.hasOwnProperty(pseudo)) {
        const baseDeclarations = baseStyles[pseudo]
        Object.keys(declarations).forEach(property => {
          // if base styles already have the property
          // we can remove it and reuse the base styles
          if (baseDeclarations.hasOwnProperty(property)) {
            delete styles[pseudo][property]
          }
        })
      }
    })
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
      if (value instanceof Object) {
        this._splitPseudoClasses(value, pseudo + property, out)
      } else {
        if (!out[pseudo]) {
          out[pseudo] = { }
        }
        const valueType = typeof value
        if (valueType === 'string' || valueType === 'number') {
          out[pseudo][property] = value
        }
      }
    })

    Object.keys(out).forEach(pseudo => {
      if (Object.keys(out[pseudo]).length === 0) {
        delete out[pseudo]
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
  _prepareStyles(pluginInterface, baseStyles) {
    const processedStyles = this._processStyles(pluginInterface)
    const splitPseudos = this._splitPseudoClasses(processedStyles)

    // only diff and extract dynamic styles 
    // if not actually rendering the base styles
    if (pluginInterface.props !== { }) {
      this._extractDynamicStyles(splitPseudos, baseStyles)
    }

    return splitPseudos
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
   * generates an unique className using a Selectors reference ID
   * as well as a content hash of the passed props
   *
   * @param {number} id - Selectors reference ID stored within the stylesheet
   * @param {strng} reference - generated props reference
   * @return {string} className - unique className reference
   */
  _renderClassName(id, reference) {
    return 'c' + id + (reference !== 's' ? '-' + reference : '')
  }


  /**
   * renders a whole cache into a CSS string
   * clusters media queries into single @media groups
   *
   * @param {Map} cache - cache including styles and media styles
   * @return {string} valid CSS string
   */
  _renderCache(cache) {
    let css = ''

    cache.forEach((variation, selector) => {
      const id = this.ids.get(selector)
      variation.forEach((styles, propsReference) => {
        const className = this._renderClassName(id, propsReference)
        // iterate each flat pseudo class style object
        Object.keys(styles).forEach(pseudo => {
          // only render styles if they're not empty
          if (Object.keys(styles[pseudo]).length > 0) {
            css += '.' + className + pseudo + '{' + cssifyObject(styles[pseudo]) + '}'
          }
        })
      })
    })

    return css
  }
}