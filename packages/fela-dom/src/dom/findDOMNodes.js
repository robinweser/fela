/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'

export default function findDOMNodes(): Object {
  return arrayReduce(
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
