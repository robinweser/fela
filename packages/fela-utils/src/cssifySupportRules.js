/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import generateCSSSupportRule from './generateCSSSupportRule'

export default function cssifySupportRules(supportRules: Object): string {
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
