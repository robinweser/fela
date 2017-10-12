/* @flow */
import createDOMSubscription from './createDOMSubscription'
import connectDOMNodes from './connectDOMNodes'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

export default function render(renderer: DOMRenderer): void {
  if (!renderer.updateSubscription) {
    connectDOMNodes(renderer)

    renderer.updateSubscription = createDOMSubscription(renderer.nodes)
    renderer.subscribe(renderer.updateSubscription)
  }
}
