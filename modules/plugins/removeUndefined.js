/* @flow weak */
import isUndefinedValue from '../utils/isUndefinedValue'
import isObject from '../utils/isObject'

function removeUndefined(style) {
  for (const property in style) {
    const value = style[property]

    if (isObject(value)) {
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
