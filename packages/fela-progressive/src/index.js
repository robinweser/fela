/* @flow */
import type DOMRenderer from '../../../flowtypes/DOMRenderer'

function setProgressiveRenderer(renderer: DOMRenderer): void {
  renderer.isProgressiveRenderer = true

  return renderer
}

// right now, all it does is setting the isProgressiveRenderer flag
// but there might be more functionality in the future
export default () => setProgressiveRenderer
