/* @flow */
import { arrayReduce } from 'fela-utils'

export default function selectDOMNodes() {
  return arrayReduce(
    document.querySelectorAll('[data-fela-type]'),
    (DOMNodes, node) => {
      const type = node.getAttribute('data-fela-type') || ''
      const media = node.getAttribute('media') || ''

      DOMNodes[type + media] = node
      return DOMNodes
    },
    {}
  )
}
