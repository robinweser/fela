/* @flow */
import createDOMNode from './createDOMNode'

export default function getDOMNode(
  nodes: Object,
  baseNode: Object,
  type: string,
  media?: string = '',
  support?: boolean = false
): Object {
  const key = type + media + (support ? 'support' : '')

  if (!nodes.hasOwnProperty(key)) {
    nodes[key] = createDOMNode(type, baseNode, media, support)
  }

  return nodes[key]
}
