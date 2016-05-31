import FontFace from '../../../modules/components/dom/FontFace'
import Keyframe from '../../../modules/components/dom/Keyframe'

import generateContentHash from './utils/generateContentHash'
import sortedStringify from './utils/sortedStringify'

import processStyle from './utils/processStyle'
import prepareStyle from './utils/prepareStyle'
import clusterStyle from './utils/clusterStyle'

import cssifyObject from './utils/cssifyObject'
import cssifyKeyframe from './utils/cssifyKeyframe'
import cssifyClusteredStyle from './utils/cssifyClusteredStyle'


export default class StyleSheet {
  /**
   * StyleSheet is a low-level container to cache Selectors
   * Keyframes and FontFaces which optimizes style
   */
  constructor(config = { }) {
    this.listeners = new Set()
    this.keyframePrefixes = config.keyframePrefixes || [ '-webkit-', '-moz-' ]
    this.keyframePrefixes.push('')
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
  _emitChange(css) {
    this.listeners.forEach(listener => listener(css))
  }

  /**
   * initializes the styleheet by setting up the caches
   */
  _init() {
    this.cache = new Map()
    this.mediaCache = new Map()
    this.fontFaces = new Map()
    this.keyframes = new Map()
    this.statics = new Set()
    this.ids = new Map()
    this._counter = -1
  }

  /**
   * helper that handles rendering of different input
   *
   * @param {Function|Keyframe|FontFace|string|Object} element - selector, Keyframe, FontFace or static style
   * @param {Object?} props - list of props to render
   * @param {Function[]?} plugins - array of plugins to process style
   * @return {string} className, animation name, font family
   */
  handleRender(element, props, plugins) {
    if (element instanceof FontFace) {
      return this._renderFontFace(element)
    }

    if (element instanceof Keyframe) {
      return this._renderKeyframeVariation(element, props, plugins)
    }

    const elementType = typeof element
    if (elementType === 'string' || elementType === 'object') {
      return this._renderStatic(element, plugins)
    }

    // renders the passed selector variation into the styleheet which
    // adds the variation to the cache and updates the DOM automatically
    // if the variation has already been added it will do nothing but return
    // the cached className to reference the mounted CSS selector
    return this._renderSelectorVariation(element, props, plugins)
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
   * renders static style and caches them
   *
   * @param {string|Object} style - static style to be rendered
   * @param {Function[]?} plugins - additional plugins 
   * @return {string} rendered CSS output
   */
  _renderStatic(style, plugins = [ ]) {
    let css = ''

    if (typeof style === 'string') {
      css = style.replace(/\s+/g, '')
    } else {
      Object.keys(style).forEach(selector => {
        const pluginInterface = {
          plugins: this.plugins.concat(plugins),
          processStyle: processStyle,
          style: style[selector]
        }

        css += selector + '{' + cssifyObject(processStyle(pluginInterface)) + '}'
      })
    }

    if (!this.statics.has(css)) {
      this.statics.add(css)
      this._emitChange(css)
    }

    return css
  }

  /**
   * renders a new font-face and caches it
   *
   * @param {FontFace} fontFace - fontFace which gets rendered
   * @return {string} fontFamily reference
   */
  _renderFontFace(fontFace) {
    if (!this.fontFaces.has(fontFace)) {
      const css = '@font-face {' + cssifyObject(fontFace.render()) + '}'
      this.fontFaces.set(fontFace, css)
      this._emitChange(css)
    }

    return fontFace.family
  }

  /**
   * renders a new keyframe variation and caches the result
   *
   * @param {Keyframe} keyframe - Keyframe which gets rendered
   * @param {Object?} props - properties used to render
   * @param {Function[]?} plugins - array of plugins to process style
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
        processStyle: this._processStyle,
        style: keyframe.render(props),
        props: props
      }

      const processedKeyframe = processStyle(pluginInterface)
      const css = cssifyKeyframe(processedKeyframe, animationName, this.keyframePrefixes)
      cachedKeyframe.set(propsReference, css)
      this._emitChange(css)
    }

    return animationName
  }

  /**
   * renders a new selector variation and caches the result
   *
   * @param {Selector|Function} selector - Selector which gets rendered
   * @param {Object?} props - properties used to render
   * @param {Function[]?} plugins - array of plugins to process style
   * @return {string} className to reference the rendered selector
   */
  _renderSelectorVariation(selector, props = { }, plugins = []) {
    // rendering a Selector for the first time
    // will create cache entries and an ID reference
    if (!this.cache.has(selector)) {
      this.ids.set(selector, ++this._counter)
      this.cache.set(selector, new Map())

      // directly render the static base style to be able
      // to diff future dynamic style with those
      this._renderSelectorVariation(selector, { }, plugins)
    }

    const cachedSelector = this.cache.get(selector)
    const propsReference = this._generatePropsReference(props)
    // uses the reference ID and the props to generate an unique className
    let className = 'c' + this.ids.get(selector) + propsReference

    // only if the cached selector has not already been rendered
    // with a specific set of properties it actually renders
    if (!cachedSelector.has(propsReference)) {
      // get the render method of either class-like selectors
      // or pure functional selectors without a constructor
      const pluginInterface = {
        plugins: this.plugins.concat(plugins),
        processStyle: this._processStyle,
        style: selector(props),
        props: props
      }


      const preparedStyle = prepareStyle(pluginInterface, cachedSelector.get('static'), propsReference)
      const clusteredStyle = clusterStyle(preparedStyle)

      if (Object.keys(clusteredStyle).length === 0) {
        cachedSelector.set(propsReference, '')
      }

      Object.keys(clusteredStyle).forEach(media => {
        const css = cssifyClusteredStyle(clusteredStyle[media], className)
        if (media === '') {
          cachedSelector.set(propsReference, css)
        } else {
          // TODO: truly ugly, refactor if possible
          if (!this.mediaCache.has(media)) {
            this.mediaCache.set(media, new Map([ [ selector, new Map() ] ]))
          }
          if (!this.mediaCache.get(media).has(selector)) {
            this.mediaCache.get(media).set(selector, new Map())
          }

          this.mediaCache.get(media).get(selector).set(propsReference, css)
        }

        // emit changes as the style stack changed
        this._emitChange(css)
      })

      // keep static style to diff dynamic onces later on
      if (propsReference === '') {
        cachedSelector.set('static', preparedStyle)
      }
    }

    const baseClassName = 'c' + this.ids.get(selector)
    if (cachedSelector.get(propsReference) === '') {
      return baseClassName
    }

    // returns either the base className or both the base and the dynamic part
    return className !== baseClassName ? baseClassName + ' ' + className : className
  }
}
