import warning from 'fbjs/lib/warning'
import StyleSheet from './StyleSheet'
import FontFace from '../../components/dom/FontFace'
import Keyframe from '../../components/dom/Keyframe'

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

    this.stylesheet = new StyleSheet(config)
    this.stylesheet.subscribe(css => this.node.textContent = css)
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
   * clears the stylesheet associated with a DOM node
   */
  clear() {
    this.stylesheet.clear()
    this.node.textContent = ''
  }
}
