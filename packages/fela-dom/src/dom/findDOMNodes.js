/* @flow */
import reduce from 'lodash/reduce'

export default function selectDOMNodes(): Object {
  return reduce(
    document.querySelectorAll('[data-fela-type]'),
    (nodes, node) => {
      const type = node.getAttribute('data-fela-type') || ''
      const media = node.getAttribute('media') || ''
      const support = node.getAttribute('media') || false

      nodes[type + media + support] = node
      return nodes
    },
    {}
  )
}
