import cssifyObject from './utils/cssifyObject'
import generateContentHash from './utils/generateContentHash'
import sortedStringify from './utils/sortedStringify'

export default class StyleSheet {
  /**
   * StyleSheet is a low-level Selector container
   */
  constructor() {
    this.listeners = new Set()
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
      css += this._renderMediaQuery(media, this._renderCache(cache))
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
    this.ids = new Map()
    this._counter = -1
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
        plugins: plugins,
        processStyles: this._processStyles,
        styles: isFunctionalSelector ? selector(props) : selector.render(props),
        className: className,
        props: props
      }

      cachedSelector.set(propsReference, this._processStyles(pluginInterface))

      if (isMediaSelector) {
        selector.mediaStrings.forEach(media => {
          pluginInterface.styles = selector.renderMedia(props, media)
          pluginInterface.media = media

          const processedStyles = this._processStyles(pluginInterface)
          this.mediaCache.get(media).get(selector).set(propsReference, processedStyles)
        })
      }

      // emit changes as the styles stack changed
      this._emitChange()
    }

    return className
  }

  /**
   * executes each plugin using a predefined plugin interface
   *
   * @param {Object} pluginInterface - interface containing relevant processing data
   * @return {Object} processed and validated styles
   */
  _processStyles(pluginInterface) {
    const { plugins, styles } = pluginInterface

    // pipes each plugin by passes the plugin interface
    // NOTE: as the styles are passed directly they're editable
    // therefore the plugin order might matter
    plugins.forEach(plugin => plugin(pluginInterface))

    return styles
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
    return 'c' + id + '-' + reference
  }


  _splitPseudoClasses(styles, pseudo = '', out = { }) {
    Object.keys(styles).forEach(property => {
      const value = styles[property]
      if (value instanceof Object) {
        this._splitPseudoClasses(value, pseudo + property, out)
      } else {
        if (!out[pseudo]) {
          out[pseudo] = { }
        }
        out[pseudo][property] = value
      }
    })

    return out
  }

  /**
   * renders a single ruleset into a CSS string
   *
   * @param {string} className - rendered selector
   * @param {Object} styles - style declarations
   * @return {string} valid selector CSS string
   */
  _renderSelector(className, styles) {
    return '.' + className + '{' + cssifyObject(styles) + '}'
  }

  /**
   * renders a set of media styles into a CSS string
   *
   * @param {string} media - media string
   * @param {string} selectors - CSS string of all selectors
   * @return {string} valid media query CSS string
   */
  _renderMediaQuery(media, selectors) {
    return '@media(' + media + '){' + selectors + '}'
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
        const splitPseudos = this._splitPseudoClasses(styles)

        Object.keys(splitPseudos).forEach(pseudo => {
          css += this._renderSelector(className + pseudo, splitPseudos[pseudo])
        })
      })
    })

    return css
  }
}
