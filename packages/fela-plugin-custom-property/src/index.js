/* @flow */
import { isObject } from 'fela-utils'

import assignStyle from 'css-in-js-utils/lib/assignStyle'

import type { StyleType } from '../../../flowtypes/StyleType'
import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'

function resolveCustomProperty(
  style: Object,
  properties: Object,
  renderer: DOMRenderer | NativeRenderer
): Object {
  // backwards-compatibility
  const merge = renderer._mergeStyle || assignStyle

  for (const property in style) {
    const value = style[property]

    if (properties.hasOwnProperty(property)) {
      merge(style, properties[property](value))
      delete style[property]
    }

    if (isObject(value)) {
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
