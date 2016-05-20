import StyleSheet from './StyleSheet'

const NODE_TYPE = 1
const NODE_NAME = 'STYLE'

// initializes a global mapping to map each node
// to a different stylesheet to prevent collision
// allows the use of multiple splitted stylesheets
const nodeMap = new Map()

export default {
  /**
   * renders a Selector variation of props into a DOM node
   *
   * @param {node} node - DOM node which gets rendered into
   * @param {Selector} selector - Selector instance that is rendered
   * @param {Object?} props - list of props to render
   * @param {Function[]?} plugins - array of plugins to process styles
   * @return {string} className reference of the rendered selector
   */
  render(node, selector, props, plugins) {
    // Check if the passed node is a valid element node which allows
    // setting the `textContent` property to update the node's content
    if (node.nodeType !== NODE_TYPE || node.textContent === undefined) {
      console.error('You need to specify a valid element node (nodeType = 1) to render into.') // eslint-disable-line
      return false
    }

    // TODO: DEV-MODE
    // In dev-mode we should allow using elements other than <style> as
    // one might want to render the CSS markup into a visible node to be able to 
    // validate and observe the styles on runtime
    if (node.nodeName !== NODE_NAME) {
      console.warn('You are using a node other than `<style>`. Your styles might not get applied correctly.') // eslint-disable-line
    }

    // references a new stylesheet for new nodes
    if (!nodeMap.has(node)) {
      const sheet = new StyleSheet()
      sheet.subscribe(css => node.textContent = css)
      nodeMap.set(node, sheet)
    }

    const stylesheet = nodeMap.get(node)
    // renders the passed selector variation into the stylesheet which
    // adds the variation to the cache and updates the DOM automatically
    // if the variation has already been added it will do nothing but return
    // the cached className to reference the mounted CSS selector
    return stylesheet._renderSelectorVariation(selector, props, plugins)
  },

  /**
   * clears the stylesheet associated with a DOM node
   * 
   * @param {node} node - DOM node which gets cleared
   */
  clear(node) {
    if (!nodeMap.has(node)) {
      console.error('You are trying to clean a node which has never been rendered to before.') // eslint-disable-line
      return false
    }

    nodeMap.get(node).clear()
    node.textContent = ''
  }
}
