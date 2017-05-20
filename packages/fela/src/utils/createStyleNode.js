/* @flow */
function getDocumentHead(): Object {
  return document.head ? document.head : {}
}

export default function createStyleNode(
  type: string,
  media: string = '',
  anchorNode: Object
): Object {
  const head = getDocumentHead()
  const node = document.createElement('style')
  node.setAttribute('data-fela-type', type)
  node.type = 'text/css'

  if (media.length > 0) {
    node.media = media
    head.appendChild(node)
  } else {
    head.insertBefore(node, anchorNode)
  }

  return node
}
