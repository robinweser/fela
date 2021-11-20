/* @flow */
import arrayEach from 'fast-loops/lib/arrayEach'

import createSubscription from './connection/createSubscription'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

export default function createRuntime(): void {
  const renderer = {}
  renderer.scoreIndex = {}
  renderer.nodes = {}

  const updateSubscription = createSubscription(renderer)

  return (changes) => arrayEach(changes, updateSubscription)
}

window.fela_inject = createRuntime()
