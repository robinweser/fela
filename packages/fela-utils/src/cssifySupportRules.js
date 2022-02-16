import { objectReduce } from 'fast-loops'

import generateCSSSupportRule from './generateCSSSupportRule'

export default function cssifySupportRules(supportRules) {
  return objectReduce(
    supportRules,
    (css, cssRules, support) => {
      if (cssRules.length > 0) {
        css += generateCSSSupportRule(support, cssRules)
      }

      return css
    },
    ''
  )
}
