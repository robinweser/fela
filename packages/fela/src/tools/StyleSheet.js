/* @flow */
import objectReduce from '../utils/objectReduce'

export default {
  create(styleSheet: Object): Object {
    return objectReduce(
      styleSheet,
      (ruleSheet, rule, ruleName) => {
        if (typeof rule === 'function') {
          ruleSheet[ruleName] = rule
        } else {
          ruleSheet[ruleName] = () => rule
        }

        return ruleSheet
      },
      {}
    )
  }
}
