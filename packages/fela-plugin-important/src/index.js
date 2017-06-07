/* @flow */
import { isObject } from 'fela-utils'

function addImportantToValue(value: any): any {
  if (
    typeof value === 'number' ||
    (typeof value === 'string' &&
      value.toLowerCase().indexOf('!important') === -1)
  ) {
    return `${value}!important`
  }

  return value
}

function addImportant(style: Object): Object {
  for (const property in style) {
    const value = style[property]

    if (isObject(value)) {
      style[property] = addImportant(value)
    } else if (Array.isArray(value)) {
      style[property] = value.map(addImportantToValue)
    } else {
      style[property] = addImportantToValue(value)
    }
  }

  return style
}

export default () => addImportant
