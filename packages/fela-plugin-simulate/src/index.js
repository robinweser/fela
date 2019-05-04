/* @flow */
import isPlainObject from 'isobject'
import assignStyle from 'css-in-js-utils/lib/assignStyle'

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

        assignStyle(style, resolvedValue)
        delete style[property]
      }
    }
  }

  return style
}

export default () => resolveSimulation
