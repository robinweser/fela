/* @flow */
import reduce from 'lodash/reduce'

export default function findDOMNodes(): Object {
  return reduce(
    document.querySelectorAll('[data-fela-type]'),
    (nodes, node) => {
      const type = node.getAttribute('data-fela-type') || ''
      const media = node.getAttribute('media') || ''
      const support = node.getAttribute('support') ? 'support' : ''

      nodes[type + media + support] = node
      return nodes
    },
    {}
  )
}
