/* @flow */
import calculateNodeScore from './calculateNodeScore'
import queryNode from './queryNode'
import createNode from './createNode'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

function getReference({
  type,
  media = '',
  support = '',
}: NodeAttributes, subscribeId: string): string {
  return type + media + support + subscribeId
}

export default function getNodeFromCache(
  attributes: NodeAttributes,
  renderer: DOMRenderer,
  target: Document
): Object {
  const reference = getReference(attributes, target.felaSubscribeId)

  if (!renderer.nodes[reference]) {
    const score = calculateNodeScore(attributes, renderer.mediaQueryOrder)
    const node =
      queryNode(attributes, target, renderer.rendererId) ||
      createNode(renderer.nodes, score, attributes, target, renderer.rendererId)

    renderer.nodes[reference] = {
      node,
      score,
      documentId: target.felaSubscribeId,
    }
  }

  return renderer.nodes[reference].node
}
