/* @flow */
import calculateNodeScore from './calculateNodeScore'
import queryNode from './queryNode'
import createNode from './createNode'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

export default function getNodeFromCache(
  attributes: NodeAttributes,
  renderer: DOMRenderer
): Object {
  const reference = attributes.type + attributes.media + attributes.support

  if (!renderer.nodes[reference]) {
    const score = calculateNodeScore(attributes, renderer.mediaQueryOrder)
    const node =
      queryNode(attributes) || createNode(renderer.nodes, score, attributes)

    renderer.nodes[reference] = {
      node,
      score,
    }
  }

  return renderer.nodes[reference].node
}
