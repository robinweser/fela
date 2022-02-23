import { objectReduce } from 'fast-loops'

export default {
  create(styleSheet) {
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
  },
}
