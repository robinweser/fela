/* @flow */
import isPlainObject from 'lodash/isPlainObject'

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
      renderer._mergeStyle(style, properties[property](value))
      delete style[property]
    }

    if (isPlainObject(value)) {
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
