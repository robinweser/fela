/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'
import { combineRules } from 'fela'

function safeRule(ruleOrObject: Function | Object): Function {
  return typeof ruleOrObject === 'function' ? ruleOrObject : () => ruleOrObject
}

export default function combineMultiRules(
  ...multiRules: Array<Function | Object>
): Function {
  return (props, renderer) => {
    return objectReduce(
      multiRules,
      (resultStyleMap, multiRule) => ({
        ...resultStyleMap,
        ...objectReduce(
          safeRule(multiRule)(props, renderer),
          (styleMap, rule, name) => ({
            ...styleMap,
            [name]: resultStyleMap[name]
              ? combineRules(resultStyleMap[name], safeRule(rule))
              : safeRule(rule),
          }),
          {}
        ),
      }),
      {}
    )
  }
}
