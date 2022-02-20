import { assignStyle } from 'css-in-js-utils'
import { arrayReduce } from 'fast-loops'

function resolveRule(rule, props, renderer) {
  if (Array.isArray(rule)) {
    return resolveRule(combineRules(...rule), props, renderer)
  }

  if (typeof rule === 'function') {
    return rule(props, renderer)
  }

  return rule
}

export default function combineRules(...rules) {
  // escape hatch to skip the object assignment for single rules
  if (rules.length === 1) {
    return rules[0]
  }

  return (props, renderer) =>
    arrayReduce(
      rules,
      (style, rule) => {
        const resolvedRule = resolveRule(rule, props, renderer)

        // special combination of our special _className key
        if (resolvedRule && style._className) {
          resolvedRule._className =
            style._className +
            (resolvedRule._className ? ' ' + resolvedRule._className : '')
        }

        return assignStyle(style, resolvedRule)
      },
      {}
    )
}
