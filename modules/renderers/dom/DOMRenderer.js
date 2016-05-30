import warning from 'fbjs/lib/warning'
import StyleSheet from './StyleSheet'

const NODE_TYPE = 1
const NODE_NAME = 'STYLE'

export default class Renderer {
  constructor(node, config) {
    // Check if the passed node is a valid element node which allows
    // setting the `textContent` property to update the node's content
    if (node.nodeType !== NODE_TYPE || node.textContent === undefined || node.setAttribute instanceof Function === false) {
      throw new Error('You need to specify a valid element node (nodeType = 1) to render into.')
    }

    warning(node.nodeName === NODE_NAME, 'You are using a node other than `<style>`. Your styles might not get applied correctly.')
    warning(!node.hasAttribute('data-fela-stylesheet'), 'This node is already used by another renderer. Rendering might overwrite other styles.')

    node.setAttribute('data-fela-stylesheet', '')
    this.node = node
    this.node.textContent = ''

    this.stylesheet = new StyleSheet(config)
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
    return this.stylesheet._handleRender(element, props, plugins)
  }

  /**
   * clears the stylesheet associated with a DOM node
   */
  clear() {
    this.stylesheet.clear()
    this.node.textContent = ''
  }
}
