/* @flow */
import createDOMSubscription from './createDOMSubscription'
import connectDOMNodes from './connectDOMNodes'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

export default function render(renderer: DOMRenderer): void {
  if (!renderer.isConnectedToDOM) {
    renderer.isConnectedToDOM = true
    connectDOMNodes(renderer)
  }

  const updateSubscription = createDOMSubscription(renderer.nodes)
  renderer.subscribe(updateSubscription)
}
