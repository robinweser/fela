/* @flow */
import createDOMNode from './createDOMNode'

export default function getDOMNode(
  styleNodes: Object,
  baseNode: Object,
  type: string,
  media: string = ''
): Object {
  const key = type + media

  if (!styleNodes.hasOwnProperty(key)) {
    styleNodes[key] = createDOMNode(type, media, baseNode)
  }

  return styleNodes[key]
}
