/* @flow */
import reduce from 'lodash/reduce'

export default {
  create(styleSheet: Object): Object {
    return reduce(
      styleSheet,
      (ruleSheet, rule, ruleName) => {
        if (typeof rule === 'function') {
          ruleSheet[ruleName] = rule
        } else {
          ruleSheet[ruleName] = () => rule
          ruleSheet[ruleName].ruleName = ruleName
        }

        return ruleSheet
      },
      {}
    )
  },
}
