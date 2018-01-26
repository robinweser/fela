/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'

export default function combineRules(...rules: Array<Function>): Function {
  return (props, renderer) =>
    arrayReduce(
      rules,
      (style, rule) => renderer._mergeStyle(style, rule(props, renderer)),
      {}
    )
}
