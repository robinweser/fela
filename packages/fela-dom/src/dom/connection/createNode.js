/* @flow */
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

function objectFind(obj: Object, query: Function) {
  for (const key in obj) {
    if (query(obj[key], key, obj)) {
      return key
    }
  }
}

export default function createNode(
  nodes: Object,
  score: number,
  { type, media, support }: NodeAttributes
): Object {
  const head = document.head || {}

  const node = document.createElement('style')
  node.setAttribute('data-fela-type', type)
  node.type = 'text/css'

  if (support) {
    node.setAttribute('data-fela-support', 'true')
  }

  if (media) {
    node.media = media
  }

  const moreSpecificReference = objectFind(nodes, node => node.score > score)

  if (moreSpecificReference) {
    head.insertBefore(node, nodes[moreSpecificReference].node)
  } else {
    head.appendChild(node)
  }

  return node
}
