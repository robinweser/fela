/* @flow */
import arrayReduce from './arrayReduce'

import type NativeRenderer from '../../../flowtypes/NativeRenderer'
import type DOMRenderer from '../../../flowtypes/DOMRenderer'

type Type = 'RULE' | 'KEYFRAME' | 'STATIC'

export default function processStyleWithPlugins(
  renderer: DOMRenderer | NativeRenderer,
  style: Object,
  type: Type,
  props: Object = {}
) {
  if (renderer.plugins.length > 0) {
    return arrayReduce(
      renderer.plugins,
      (processedStyle, plugin) => {
        processedStyle = plugin(processedStyle, type, renderer, props)
        return processedStyle
      },
      style
    )
  }

  return style
}
