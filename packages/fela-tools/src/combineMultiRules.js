import { objectReduce, arrayReduce } from 'fast-loops'

import { combineRules } from 'fela'

function safeRule(ruleOrObject) {
  return typeof ruleOrObject === 'function' ? ruleOrObject : () => ruleOrObject
}

export default function combineMultiRules(...multiRules) {
  return (props, renderer) =>
    arrayReduce(
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
