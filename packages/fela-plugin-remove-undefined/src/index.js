/* @flow */
import { isUndefinedValue } from 'fela-utils'
import isPlainObject from 'isobject'

import deprecate from './deprecate'

deprecate(`The remove undefined plugin (fela-plugin-remove-undefined) is deprecated, please remove it from your Fela configuration.
Fela automatically removes 'undefined' values making this plugin obsolete.`)

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
