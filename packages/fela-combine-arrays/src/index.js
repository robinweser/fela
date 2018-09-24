/* @flow */
import createMergeArrayStyle from './createMergeArrayStyle'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'
import type NativeRenderer from '../../../flowtypes/NativeRenderer'

import deprecate from './deprecate'

type Renderer = DOMRenderer | NativeRenderer

deprecate(`The combine arrays enhancer (fela-combine-arrays) is deprecated, please remove it from your Fela configuration.
It is obsolete as css-in-js-utils' new 'assignStyle' implementation combines arrays by default. See https://github.com/rofrischmann/css-in-js-utils/pull/6`)

export default function combineArrays(properties?: Array<string>) {
  const mergeStyle = createMergeArrayStyle(properties)

  return (renderer: Renderer) => {
    renderer._mergeStyle = mergeStyle
    return renderer
  }
}
