/* @flow */
import createDOMNode from './createDOMNode'

export default function getDOMNode(
  nodes: Object,
  baseNode: Object,
  type: string,
  media: string = ''
): Object {
  const key = type + media

  if (!nodes.hasOwnProperty(key)) {
    nodes[key] = createDOMNode(type, media, baseNode)
  }

  return nodes[key]
}
