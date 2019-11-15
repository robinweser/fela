/* @flow */
import queryNode from './queryNode'
import createNode from './createNode'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

function getReference({
  type,
  media = '',
  support = '',
}: NodeAttributes): string {
  return type + media + support
}

export default function getNodeFromCache(
  attributes: NodeAttributes,
  renderer: DOMRenderer,
  targetDocument: any = document
): Object {
  const reference = getReference(attributes)

  if (!renderer.nodes[reference]) {
    const node =
      queryNode(attributes, targetDocument) ||
      createNode(attributes, targetDocument, renderer.sortMediaQuery)

    renderer.nodes[reference] = node
  }

  return renderer.nodes[reference]
}
