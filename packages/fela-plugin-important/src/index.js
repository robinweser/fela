/* @flow */
import isPlainObject from 'isobject'
import { RULE_TYPE } from 'fela-utils'

import type { StyleType } from '../../../flowtypes/StyleType'

function addImportantToValue(value: any): any {
  const valueType = typeof value

  if (
    valueType === 'number' ||
    (valueType === 'string' && value.toLowerCase().indexOf('!important') === -1)
  ) {
    return `${value}!important`
  }

  return value
}

function addImportant(style: Object, type: StyleType): Object {
  if (type === RULE_TYPE) {
    for (const property in style) {
      const value = style[property]
      if (property === 'className' || property === '_className') {
        // this is a fixed classname, not a style rule - leave as is
      } else if (isPlainObject(value)) {
        style[property] = addImportant(value)
      } else if (Array.isArray(value)) {
        style[property] = value.map(addImportantToValue)
      } else {
        style[property] = addImportantToValue(value)
      }
    }
  }

  return style
}

addImportant.optimized = (props) => {
  props.value = addImportantToValue(props.value)
}

export default () => addImportant
