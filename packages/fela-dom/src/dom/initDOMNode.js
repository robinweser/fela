/* @flow */
import getDOMNode from './getDOMNode'

export default function initDOMNode(
  nodes: Object,
  baseNode: Object,
  css: string,
  type: string,
  media?: string = '',
  support?: boolean = false
): void {
  const node = getDOMNode(nodes, baseNode, type, media, support)
  // in case that there is a node coming from server already
  // but rules are not matchnig
  if (node.textContent !== css) {
    node.textContent = css
  }
}
