/* @flow */
import objectEach from 'fast-loops/lib/objectEach'
import generateClassName from 'fela/lib/generateClassName'

import createSubscription from './connection/createSubscription'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

let id = 100
const getId = () => {
  id += 1

  return id
}

export default function render(
  renderer: DOMRenderer,
  target: Document = document
): void {
  if (!renderer.updateSubscription) {
    renderer.scoreIndex = {}
    renderer.nodes = {}

    target.felaSubscribeId = generateClassName(getId)

    renderer.updateSubscription = createSubscription(renderer, target)
    renderer.subscribe(renderer.updateSubscription)

    // simulate rendering to ensure all styles rendered prior to
    // calling FelaDOM.render are correctly injected as well
    objectEach(renderer.cache, renderer._emitChange)
  }

  if (!target.felaSubscribeId) {
    target.felaSubscribeId = generateClassName(getId)

    const updateSubscription = createSubscription(renderer, target)
    renderer.subscribe(updateSubscription)

    // simulate rendering to ensure all styles rendered prior to
    // calling FelaDOM.render are correctly injected as well
    objectEach(renderer.cache, renderer._emitChange)
  }
}
