/* @flow */
import createMergeArrayStyle from './createMergeArrayStyle'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'
import type NativeRenderer from '../../../flowtypes/NativeRenderer'

type Renderer = DOMRenderer | NativeRenderer

export default function combineArrays(properties?: Array<string>) {
  const mergeStyle = createMergeArrayStyle(properties)

  return (renderer: Renderer) => {
    renderer._mergeStyle = mergeStyle
    return renderer
  }
}
