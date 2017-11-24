/* @flow */
import reduce from 'lodash/reduce'

import generateCSSSupportRule from './generateCSSSupportRule'

export default function cssifySupportRules(supportRules: Object): string {
  return reduce(
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
