/* @flow */
import reduce from 'lodash/reduce'

export default function selectDOMNodes(): Object {
  return reduce(
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
