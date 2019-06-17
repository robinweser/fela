/* @flow */
import calculateNodeScore from './calculateNodeScore'
import queryNode from './queryNode'
import createNode from './createNode'

import type {
  DOMRenderer,
  DOMRendererDocumentRef,
} from '../../../../../flowtypes/DOMRenderer'
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

function getReference(
  { type, media = '', support = '' }: NodeAttributes,
  documentRef: DOMRendererDocumentRef
): string {
  return type + media + support + documentRef.refId
}

export default function getNodeFromCache(
  attributes: NodeAttributes,
  renderer: DOMRenderer,
  documentRef: DOMRendererDocumentRef
): Object {
  const reference = getReference(attributes, documentRef)

  if (!renderer.nodes[reference]) {
    const score = calculateNodeScore(attributes, renderer.mediaQueryOrder)
    const node =
      queryNode(attributes, documentRef) ||
      createNode(renderer.nodes, score, attributes, documentRef)

    renderer.nodes[reference] = {
      refId: documentRef.refId,
      node,
      score,
    }
  }

  return renderer.nodes[reference].node
}
