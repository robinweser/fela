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

  renderToString() {
    return this.stylesheet.renderToString()
  }

  /**
   * clears the stylesheet
   */
  clear() {
    this.stylesheet.clear()
  }
}
