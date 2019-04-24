/* @flow */
import calculateNodeScore from './calculateNodeScore'
import queryNode from './queryNode'
import createNode from './createNode'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

function getReference(
  { type, media = '', support = '' }: NodeAttributes,
  documentId: string
): string {
  return type + media + support + documentId
}

export default function getNodeFromCache(
  attributes: NodeAttributes,
  renderer: DOMRenderer,
  target: Document
): Object {
  const head = target.head || {}
  const documentId = head.getAttribute('fela-document-id') || ''
  const reference = getReference(attributes, documentId)

  if (!renderer.nodes[reference]) {
    const score = calculateNodeScore(attributes, renderer.mediaQueryOrder)
    const node =
      queryNode(attributes, target, renderer.rendererId) ||
      createNode(renderer.nodes, score, attributes, target, renderer.rendererId)

    renderer.nodes[reference] = {
      node,
      score,
      documentId,
    }
  }

  return renderer.nodes[reference].node
}
