/* @flow */
import assignStyle from 'css-in-js-utils/lib/assignStyle'
import arrayReduce from 'fast-loops/lib/arrayReduce'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'

function resolveRule(
  rule: Array<Function | Object> | Function | Object,
  props: Object,
  renderer: DOMRenderer | NativeRenderer
): Object {
  if (Array.isArray(rule)) {
    return resolveRule(combineRules(...rule), props, renderer)
  }

  if (typeof rule === 'function') {
    return rule(props, renderer)
  }

  return rule
}

export default function combineRules(
  ...rules: Array<Function | Object>
): Function {
  return (props, renderer) =>
    arrayReduce(
      rules,
      (style, rule) => assignStyle(style, resolveRule(rule, props, renderer)),
      {}
    )
}
