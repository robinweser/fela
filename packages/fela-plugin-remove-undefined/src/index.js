/* @flow */
import isPlainObject from 'lodash/isPlainObject'
import { isUndefinedValue } from 'fela-utils'

function removeUndefined(style: Object): Object {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      style[property] = removeUndefined(value)
    } else if (Array.isArray(value)) {
      style[property] = value.filter(val => !isUndefinedValue(val))
    } else if (isUndefinedValue(value)) {
      delete style[property]
    }
  }

  return style
}

export default () => removeUndefined
