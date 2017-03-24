/* @flow weak */
import createDOMInterface from './DOMInterface'
import warning from '../utils/warning'
import isValidHTMLElement from '../utils/isValidHTMLElement'

export default function render(renderer, mountNode) {
  // mountNode must be a valid HTML element to be able
  // to set mountNode.textContent later on
  if (!isValidHTMLElement(mountNode)) {
    throw new Error(
      'You need to specify a valid element node (nodeType = 1) to render into.'
    )
  }

  // warns if the DOM node either is not a valid <style> element
  // thus the styles do not get applied as Expected
  // or if the node already got the data-fela-stylesheet attribute applied
  // suggesting it is already used by another Renderer
  warning(
    mountNode.nodeName === 'STYLE',
    'You are using a node other than `<style>`. Your styles might not get applied correctly.'
  )

  // mark and clean the DOM node to prevent side-effects
  mountNode.setAttribute('data-fela-stylesheet', '')

  const updateNode = createDOMInterface(renderer, mountNode)
  renderer.subscribe(updateNode)

  const css = renderer.renderToString()

  if (mountNode.textContent !== css) {
    // render currently rendered styles to the DOM once
    mountNode.textContent = css
  }
}
