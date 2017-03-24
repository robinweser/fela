/* @flow */
import renderToString from './server/renderToString'

export default function createDOMStream(renderer, node) {
  return renderer.subscribe(() => {
    node.textContent = renderToString(renderer)
  })
}
