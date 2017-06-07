/* @flow */
import createStyleNode from './createStyleNode'

export default function getStyleNode(
  styleNodes: Object,
  baseNode: Object,
  type: string,
  media: string = ''
): Object {
  const key = type + media

  if (!styleNodes[key]) {
    styleNodes[key] = createStyleNode(type, media, baseNode)
  }

  return styleNodes[key]
}
