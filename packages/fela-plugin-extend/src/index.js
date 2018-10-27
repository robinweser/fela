/* @flow */
import objectEach from 'fast-loops/lib/objectEach'
import arrayEach from 'fast-loops/lib/arrayEach'
import assignStyle from 'css-in-js-utils/lib/assignStyle'
import isPlainObject from 'isobject'

import { isUndefinedValue } from 'fela-utils'

function removeUndefined(style: Object): Object {
  objectEach(style, (value, property) => {
    if (isPlainObject(value)) {
      style[property] = removeUndefined(value)
    } else if (Array.isArray(value)) {
      style[property] = value.filter(val => !isUndefinedValue(val))
    } else if (isUndefinedValue(value)) {
      delete style[property]
    }
  })

  return style
}

function extendStyle(style: Object, extension: Object): void {
  // extend conditional style objects
  if (extension.hasOwnProperty('condition')) {
    if (extension.condition) {
      // eslint-disable-next-line no-use-before-define
      assignStyle(style, extend(extension.style))
    }
  } else {
    // extend basic style objects
    assignStyle(style, removeUndefined(extension))
  }
}

function extend(style: Object): Object {
  objectEach(style, (value, property) => {
    if (property === 'extend') {
      const extensions = [].concat(value)

      arrayEach(extensions, extension => extendStyle(style, extension))
      delete style[property]
    } else if (isPlainObject(value)) {
      // support nested extend as well
      style[property] = extend(value)
    }
  })

  return style
}

export default () => extend
