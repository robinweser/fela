/* @flow */
import isPlainObject from 'isobject'
import arrayReduce from 'fast-loops/lib/arrayReduce'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

function getThemeValue(object, key) {
  const value = arrayReduce(
    key.split('.'),
    (value, index) => {
      if (isPlainObject(value) && value[index]) {
        return value[index]
      }

      return undefined
    },
    object
  )

  return value || key
}

function resolveThemeValues(
  style: Object,
  theme: Object = {},
  mapping: Object
): Object {
  for (const property in style) {
    const value = style[property]

    if (typeof value === 'string' && mapping[property]) {
      style[property] = getThemeValue(mapping[property](theme), value)
    } else if (isPlainObject(value)) {
      style[property] = resolveThemeValues(style[property], theme, mapping)
    }
  }

  return style
}

export default function themeValue(mapping: Object = {}) {
  return (
    style: Object,
    type: StyleType,
    renderer: DOMRenderer | NativeRenderer,
    props: Object
  ) => resolveThemeValues(style, props.theme, mapping)
}
