export default function isValidHTMLElement(mountNode) {
  return mountNode && mountNode.nodeType === 1
}
