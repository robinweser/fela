import StyleSheet from './StyleSheet'

export default class Renderer {
  constructor(config) {
    this.stylesheet = new StyleSheet(config)
  }

  /**
   * renders selector or Keyframe variations, FontFaces and static styles
   * to an intern StyleSheet that caches those for future use
   *
   * @param {Function|Keyframe|FontFace|string|Object} selector - selector, Keyframe, FontFace or static styles
   * @param {Object?} props - list of props to render
   * @param {Function[]?} plugins - array of plugins to process styles
   * @return {string} className, animation name, font family
   */
  render(selector, props, plugins) {
    return this.stylesheet._handleRender(selector, props, plugins)
  }

  /**
   * renders all cached selector styles into a single valid CSS string
   * clusters media query styles into groups to reduce output size

   * @return single concatenated CSS string
   */
  renderToString() {
    let css = ''

    this.stylesheet.fontFaces.forEach(markup => css += markup)
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
