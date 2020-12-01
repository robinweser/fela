/* @flow */
import resolveArrayValue from 'css-in-js-utils/lib/resolveArrayValue'
import isPlainObject from 'isobject'

function resolveFallbackValues(style: Object): Object {
  for (const property in style) {
    const value = style[property]

    if (Array.isArray(value)) {
      style[property] = resolveArrayValue(property, value)
    } else if (isPlainObject(value) && property !== 'fontFace') {
      style[property] = resolveFallbackValues(value)
    }
  }

  return style
}

resolveFallbackValues.specific = {
  value: (value, property) =>
    Array.isArray(value) ? resolveArrayValue(property, value) : value,
}

export default () => resolveFallbackValues
