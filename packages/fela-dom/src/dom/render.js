/* @flow */
import objectEach from 'fast-loops/lib/objectEach'

import createDOMSubscription from './createDOMSubscription'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

export default function render(renderer: DOMRenderer): void {
  if (!renderer.updateSubscription) {
    renderer.nodes = {}

    renderer.updateSubscription = createDOMSubscription(renderer)
    renderer.subscribe(renderer.updateSubscription)

    objectEach(renderer.cache, renderer._emitChange)
  }
}
