import warning from 'fbjs/lib/warning'
import StyleSheet from './StyleSheet'

const NODE_TYPE = 1
const NODE_NAME = 'STYLE'

export default class Renderer {
  constructor(node, config) {
    // check if the passed node is a valid element node which allows
    // setting the `textContent` property to update the node's content
    if (!node || node.nodeType !== NODE_TYPE || node.textContent === undefined || node.setAttribute instanceof Function === false) {
      throw new Error('You need to specify a valid element node (nodeType = 1) to render into.')
    }

    // warns if the DOM node either is not a valid <style> element thus the styles do not get applied as Expected
    // or if the node already got the data-fela-stylesheet attribute applied suggesting it is already used by another Renderer
    warning(node.nodeName === NODE_NAME, 'You are using a node other than `<style>`. Your styles might not get applied correctly.')
    warning(!node.hasAttribute('data-fela-stylesheet'), 'This node is already used by another renderer. Rendering might overwrite other styles.')

    // mark and clean the DOM node to prevent side-effects
    node.setAttribute('data-fela-stylesheet', '')
    node.textContent = ''
    this.node = node

    this.stylesheet = new StyleSheet(config)
    // adds newly rendered markup to the DOM node's textContent
    // TODO: Benchmark for best (fastest) insertion technique
    // see https://github.com/rofrischmann/fela/issues/3
    this.stylesheet.subscribe(css => this.node.textContent += css)
  }

  /**
   * renders selector or Keyframe variations, FontFaces and static styles
   * to an intern StyleSheet that caches those and updates the DOM node
   *
   * @param {Function|Keyframe|FontFace|string|Object} element - selector, Keyframe, FontFace or static styles
   * @param {Object?} props - list of props to render
   * @param {Function[]?} plugins - array of plugins to process styles
   * @return {string} className, animation name, font family
   */
  render(element, props, plugins) {
    return this.stylesheet.handleRender(element, props, plugins)
  }

  /**
   * clears the stylesheet associated with a DOM node
   */
  clear() {
    this.stylesheet.clear()
    this.node.textContent = ''
  }
}
