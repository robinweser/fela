/* @flow */
import arrayReduce from './arrayReduce'

import type NativeRenderer from '../../../../flowtypes/NativeRenderer'
import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

export default function processStyleWithPlugins(
  renderer: DOMRenderer | NativeRenderer,
  style: Object,
  type: number
) {
  if (renderer.plugins.length > 0) {
    return arrayReduce(
      renderer.plugins,
      (processedStyle, plugin) => {
        processedStyle = plugin(processedStyle, type, renderer)
        return processedStyle
      },
      style
    )
  }

  return style
}
