/* @flow */
import assignStyle from 'css-in-js-utils/lib/assignStyle'
import arrayReduce from 'fast-loops/lib/arrayReduce'

import resolveRule from './resolveRule'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'

export default function combineRules(...rules: Array<Function>): Function {
  return (props, renderer) => {
    const merge = renderer._mergeStyle || assignStyle

    return arrayReduce(
      rules,
      (style, rule) => merge(style, resolveRule(rule, props, renderer)),
      {}
    )
  }
}
