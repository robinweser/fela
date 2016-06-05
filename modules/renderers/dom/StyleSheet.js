import FontFace from '../../../modules/components/dom/FontFace'
import Keyframe from '../../../modules/components/dom/Keyframe'

import generateContentHash from './utils/generateContentHash'
import sortedStringify from './utils/sortedStringify'

import validateStyle from './utils/validateStyle'
import processStyle from './utils/processStyle'
import cssifyKeyframe from './utils/cssifyKeyframe'
import cssifyObject from './utils/cssifyObject'

import isMediaQuery from './utils/isMediaQuery'
import isPseudoClass from './utils/isPseudoClass'


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
    // renders static styles either passed as a valid CSS string
    // or alternatively as an style object of selectors
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
   * initializes the styleheet by setting up the caches
   */
  _init() {
    this.fontFaces = ''
    this.keyframes = ''
    this.statics = ''
    this.selectors = ''
    this.mediaSelectors = new Map()
    this.rendered = new Map()
    this.base = new Map()
    this.ids = new Map()
    this._counter = -1
  }

  /**
   * calls each listener with the current CSS markup of all caches
   * gets only called if the markup actually changes
   *
   * @param {Function} callback - callback function which will be executed
   * @return {Object} equivalent unsubscribe method
   */
  _emitChange() {
    const css = this._renderToString()
    this.listeners.forEach(listener => listener(css))
  }

  /**
   * renders all cached styles into a single valid CSS string
   * clusters media query styles into groups to reduce output size

   * @return single concatenated CSS string
   */
  _renderToString() {
    let css = this.fontFaces + this.statics + this.selectors
    this.mediaSelectors.forEach((markup, media) => {
      css += '@media ' + media + '{' + markup + '}'
    })

    return css + this.keyframes
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
    if (!this.rendered.has(style)) {
      let css = ''

      if (typeof style === 'string') {
        // remove new lines from template strings
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

      this.rendered.set(style, true)
      this.statics += css
      this._emitChange()
    }
  }

  /**
   * renders a new font-face and caches it
   *
   * @param {FontFace} fontFace - fontFace which gets rendered
   * @return {string} fontFamily reference
   */
  _renderFontFace(fontFace) {
    if (!this.rendered.has(fontFace)) {
      const css = '@font-face{' + cssifyObject(fontFace.render()) + '}'
      this.rendered.set(fontFace, true)
      this.fontFaces += css
      this._emitChange()
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
    if (!this.ids.has(keyframe)) {
      this.ids.set(keyframe, ++this._counter)
    }

    const propsReference = this._generatePropsReference(props)
    const animationName = 'k' + this.ids.get(keyframe) + propsReference

    // only if the cached selector has not already been rendered
    // with a specific set of properties it actually renders
    if (!this.rendered.has(animationName)) {
      const pluginInterface = {
        plugins: this.plugins.concat(plugins),
        processStyle: processStyle,
        style: keyframe.render(props),
        props: props
      }

      const processedKeyframe = processStyle(pluginInterface)
      const css = cssifyKeyframe(processedKeyframe, animationName, this.keyframePrefixes)
      this.rendered.set(animationName, true)
      this.keyframes += css
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
    // will create an ID reference
    if (!this.ids.has(selector)) {
      this.ids.set(selector, ++this._counter)

      // directly render the static base style to be able
      // to diff future dynamic style with those
      this._renderSelectorVariation(selector, { }, plugins)
    }

    // uses the reference ID and the props to generate an unique className
    const selectorId = this.ids.get(selector)
    const className = 'c' + selectorId + this._generatePropsReference(props)

    // only if the cached selector has not already been rendered
    // with a specific set of properties it actually renders
    if (!this.rendered.has(className)) {
      // get the render method of either class-like selectors
      // or pure functional selectors without a constructor
      const pluginInterface = {
        plugins: this.plugins.concat(plugins),
        processStyle: processStyle,
        style: selector(props),
        props: props
      }

      const style = validateStyle(processStyle(pluginInterface))
      const base = this.base.get(selector)

      this._renderStyle(className, style, base)

      if (this._didChange) {
        this.rendered.set(className, true)
        this._didChange = false
        this._emitChange()
      } else {
        this.rendered.set(className, false)
      }

      // keep static style to diff dynamic onces later on
      if (className === 'c' + selectorId) {
        this.base.set(selector, style)
      }
    }

    const baseClassName = 'c' + selectorId
    if (!this.rendered.get(className)) {
      return baseClassName
    }

    // returns either the base className or both the base and the dynamic part
    return className !== baseClassName ? baseClassName + ' ' + className : className
  }




  // really need to refactor that
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
        const currentMedia = this.mediaSelectors.get(media)
        this.mediaSelectors.set(media, currentMedia ? currentMedia + css : css)
      } else {
        this.selectors += css
      }
    }
  }
}
