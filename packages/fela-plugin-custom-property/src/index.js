/* @flow */
import isPlainObject from 'isobject'

import type { StyleType } from '../../../flowtypes/StyleType'
import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'

function resolveCustomProperty(
  style: Object,
  properties: Object,
  renderer: DOMRenderer | NativeRenderer
): Object {
  for (const property in style) {
    const value = style[property]

    if (properties.hasOwnProperty(property)) {
      const resolved = properties[property](value)
      renderer._mergeStyle(style, resolved)

      if (!resolved.hasOwnProperty(property)) {
        delete style[property]
      }
    }

    if (style.hasOwnProperty(property) && isPlainObject(value)) {
      style[property] = resolveCustomProperty(value, properties, renderer)
    }
  }

  return style
}

export default function customProperty(properties: Object) {
  return (
    style: Object,
    type: StyleType,
    renderer: DOMRenderer | NativeRenderer
  ) => resolveCustomProperty(style, properties, renderer)
}
