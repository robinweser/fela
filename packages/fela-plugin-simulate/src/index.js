/* @flow */
import isPlainObject from 'isobject'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

function resolveSimulation(
  style: Object,
  type: StyleType,
  renderer: DOMRenderer | NativeRenderer,
  props: Object
): Object {
  if (props.simulate) {
    for (const property in style) {
      const value = style[property]

      if (isPlainObject(value) && props.simulate[property]) {
        const resolvedValue = resolveSimulation(value, type, renderer, props)

        renderer._mergeStyle(style, resolvedValue)
        delete style[property]
      }
    }
  }

  return style
}

export default () => resolveSimulation
