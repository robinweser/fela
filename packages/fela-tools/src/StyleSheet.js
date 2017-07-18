/* @flow */
import { objectReduce } from 'fela-utils'

export default {
  create(styleSheet: Object): Object {
    return objectReduce(
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
  }
}
