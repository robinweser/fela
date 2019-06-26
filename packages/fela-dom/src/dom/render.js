/* @flow */
import objectEach from 'fast-loops/lib/objectEach'

import createSubscription from './connection/createSubscription'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

export default function render(
  renderer: DOMRenderer,
  targetDocument?: any
): void {
  if (!renderer.updateSubscription) {
    renderer.scoreIndex = {}
    renderer.nodes = {}

    renderer.updateSubscription = createSubscription(renderer, targetDocument)
    renderer.subscribe(renderer.updateSubscription)

    // simulate rendering to ensure all styles rendered prior to
    // calling FelaDOM.render are correctly injected as well
    objectEach(renderer.cache, renderer._emitChange)
  }
}
