import { arrayEach, arrayFilter, objectEach } from 'fast-loops'
import { assignStyle } from 'css-in-js-utils'
import isPlainObject from 'isobject'

import { isUndefinedValue } from 'fela-utils'

function removeUndefined(style) {
  objectEach(style, (value, property) => {
    if (isPlainObject(value)) {
      style[property] = removeUndefined(value)
    } else if (Array.isArray(value)) {
      style[property] = arrayFilter(value, (item) => !isUndefinedValue(item))
    } else if (isUndefinedValue(value)) {
      delete style[property]
    }
  })

  return style
}

function extendStyle(style, extension) {
  // extend conditional style objects
  if (extension && extension.hasOwnProperty('condition')) {
    if (extension.condition) {
      // eslint-disable-next-line no-use-before-define
      assignStyle(style, extendPlugin(extension.style))
    }
  } else {
    // extend basic style objects
    // eslint-disable-next-line no-use-before-define
    assignStyle(style, removeUndefined(extendPlugin(extension)))
  }
}

function extendPlugin(style) {
  objectEach(style, (value, property) => {
    if (property === 'extend') {
      const extensions = [].concat(value)

      arrayEach(extensions, (extension) => extendStyle(style, extension))
      delete style[property]
    } else if (isPlainObject(value)) {
      // support nested extend as well
      style[property] = extendPlugin(value)
    }
  })

  return style
}

export default function extend() {
  return extendPlugin
}
