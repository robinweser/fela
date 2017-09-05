/* @flow */
function getDocumentHead(): Object {
  return document.head || {}
}

export default function createDOMNode(
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
    // if anchorNode is undefined it will
    // be added at the end by default
    head.insertBefore(node, anchorNode)
  }

  return node
}
