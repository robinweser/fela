/* @flow */
export default function isValidHTMLElement(mountNode: Object): boolean {
  return mountNode && mountNode.nodeType === 1
}
