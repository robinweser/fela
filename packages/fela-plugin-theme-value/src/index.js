/* @flow */
import isPlainObject from 'isobject'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

function getValue(object, key) {
  const value = key.split('.').reduce((value, key) => {
    if (isPlainObject(value) && value[key]) {
      return value[key]
    }

    return undefined
  }, object)

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
      style[property] = getValue(mapping[property](theme), value)
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
  ): Object => resolveThemeValues(style, props.theme, mapping)
}
