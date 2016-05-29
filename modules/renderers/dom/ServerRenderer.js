import StyleSheet from './StyleSheet'
import FontFace from '../../components/dom/FontFace'
import Keyframe from '../../components/dom/Keyframe'

export default class Renderer {
  constructor(config) {
    this.stylesheet = new StyleSheet(config)
  }

  /**
   * renders a Selector variation of props into a DOM node
   *
   * @param {Selector} selector - Selector instance that is rendered
   * @param {Object?} props - list of props to render
   * @param {Function[]?} plugins - array of plugins to process styles
   * @return {string} className reference of the rendered selector
   */
  render(selector, props, plugins) {
    if (selector instanceof FontFace) {
      return this.stylesheet._renderFontFace(selector)
    }

    if (selector instanceof Keyframe) {
      return this.stylesheet._renderKeyframeVariation(selector, props, plugins)
    }

    // renders the passed selector variation into the stylesheet which
    // adds the variation to the cache and updates the DOM automatically
    // if the variation has already been added it will do nothing but return
    // the cached className to reference the mounted CSS selector
    return this.stylesheet._renderSelectorVariation(selector, props, plugins)
  }

  /**
   * renders all cached selector styles into a single valid CSS string
   * clusters media query styles into groups to reduce output size

   * @return single concatenated CSS string
   */
  renderToString() {
    let css = ''

    this.stylesheet.fontFaces.forEach(fontFace => css += fontFace)
    css += this._renderCache(this.stylesheet.cache)
    this.stylesheet.mediaCache.forEach((cache, media) => {
      css += '@media ' + media + '{' + this._renderCache(cache) + '}'
    })
    this.stylesheet.keyframes.forEach(variation => {
      variation.forEach(markup => css += markup)
    })

    return css
  }

  /**
   * clears the stylesheet
   */
  clear() {
    this.stylesheet.clear()
  }


  /**
   * renders a whole cache into a single CSS string
   *
   * @param {Map} cache - cache including all selector variations
   * @return {string} valid CSS string
   */
  _renderCache(cache) {
    let css = ''

    cache.forEach(variation => {
      variation.forEach((markup, propsReference) => {
        if (propsReference !== 'static') {
          css += markup
        }
      })
    })

    return css
  }
}
