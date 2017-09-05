/* @flow */
import getDOMNode from './getDOMNode'

export default function initDOMNode(
  styleNodes: Object,
  baseNode: Object,
  css: string,
  type: string,
  media: string = ''
): void {
  const node = getDOMNode(styleNodes, baseNode, type, media)
  // in case that there is a node coming from server already
  // but rules are not matchnig
  if (node.textContent !== css) {
    node.textContent = css
  }
}
