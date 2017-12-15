/* @flow */
function getDocumentHead(): Object {
  return document.head || {}
}

export default function createDOMNode(
  type: string,
  anchorNode?: Object,
  media?: string = '',
  support?: boolean = false
): Object {
  const head = getDocumentHead()

  const node = document.createElement('style')
  node.setAttribute('data-fela-type', type)
  node.type = 'text/css'

  if (support) {
    node.setAttribute('data-fela-support', 'true')
  }

  if (media.length > 0) {
    node.media = media
  }

  const parentNode = anchorNode ? anchorNode.parentNode : head

  if (support || media.length > 0) {
    parentNode.appendChild(node)
  } else if (anchorNode) {
    parentNode.insertBefore(node, anchorNode)
  } else {
    parentNode.appendChild(node)
  }

  return node
}
