import StyleSheet from './StyleSheet'

export default class Renderer {
  constructor(config) {
    this.stylesheet = new StyleSheet(config)
  }

  /**
   * renders selector or Keyframe variations, FontFaces and static styles
   * to an intern StyleSheet that caches those for future use
   *
   * @param {Function|Keyframe|FontFace|string|Object} element - selector, Keyframe, FontFace or static styles
   * @param {Object?} props - list of props to render
   * @param {Function[]?} plugins - array of plugins to process styles
   * @return {string} className, animation name, font family
   */
  render = (element, props, plugins) => {
    return this.stylesheet.handleRender(element, props, plugins)
  }

  /**
   * renders all cached styles into a single valid CSS string
   * clusters media query styles into groups to reduce output size

   * @return single concatenated CSS string
   */
  renderToString() {
    return this.stylesheet._renderToString()
  }

  /**
   * clears the stylesheet
   */
  clear() {
    this.stylesheet.clear()
  }
}
