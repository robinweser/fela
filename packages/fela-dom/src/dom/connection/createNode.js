/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

export default function createNode(
  nodes: Object,
  score: number,
  { type, media, support }: NodeAttributes,
  targetDocument: any = document
): Object {
  const head = targetDocument.head || {}

  const node = targetDocument.createElement('style')
  node.setAttribute('data-fela-type', type)
  node.type = 'text/css'

  if (support) {
    node.setAttribute('data-fela-support', 'true')
  }

  if (media) {
    node.media = media
  }

  // we calculate the most next bigger style node
  // to correctly inject the node just before it
  const moreSpecificReference = objectReduce(
    nodes,
    (closest, currentNode, reference) =>
      currentNode.score > score &&
      (!closest || nodes[closest].score > currentNode.score)
        ? reference
        : closest,
    undefined
  )

  if (moreSpecificReference) {
    head.insertBefore(node, nodes[moreSpecificReference].node)
  } else {
    head.appendChild(node)
  }

  return node
}
