/* @flow */
import createDOMSubscription from './createDOMSubscription'
import findDOMNodes from './findDOMNodes'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

export default function render(renderer: DOMRenderer): void {
  if (!renderer.updateSubscription) {
    renderer.nodes = {}

    renderer.updateSubscription = createDOMSubscription(renderer)
    renderer.subscribe(renderer.updateSubscription)
  }
}
