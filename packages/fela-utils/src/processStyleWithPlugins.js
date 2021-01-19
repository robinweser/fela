/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'

import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'
import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

export default function processStyleWithPlugins(
  renderer: DOMRenderer | NativeRenderer,
  style: Object,
  type: StyleType,
  props: Object = {},
  plugins: Array<Function> = renderer.plugins
) {
  if (plugins.length > 0) {
    return arrayReduce(
      plugins,
      (processedStyle, plugin) => plugin(processedStyle, type, renderer, props),
      style
    )
  }

  return style
}
