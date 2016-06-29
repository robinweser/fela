import warning from './utils/warning'

const NODE_TYPE = 1
const NODE_NAME = 'STYLE'

export default function render(renderer, mountNode) {
  // check if the passed node is a valid element node which allows
  // setting the `textContent` property to update the node's content
  if (!mountNode || mountNode.nodeType !== NODE_TYPE) {
    throw new Error('You need to specify a valid element node (nodeType = 1) to render into.')
  }

  // warns if the DOM node either is not a valid <style> element thus the styles do not get applied as Expected
  // or if the node already got the data-fela-stylesheet attribute applied suggesting it is already used by another Renderer
  warning(mountNode.nodeName === NODE_NAME, 'You are using a node other than `<style>`. Your styles might not get applied correctly.')
  warning(!mountNode.hasAttribute('data-fela-stylesheet'), 'This node is already used by another renderer. Rendering might overwrite other styles.')

  // mark and clean the DOM node to prevent side-effects
  mountNode.setAttribute('data-fela-stylesheet', '')

  // updated the DOM node's textContent with newly rendered markup
  renderer.subscribe(css => mountNode.textContent = css)

  // render currently rendered styles to the DOM once
  if (mountNode.textContent === '') {
    mountNode.textContent = renderer.renderToString()
  }
}
