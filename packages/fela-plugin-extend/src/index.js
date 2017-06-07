/* @flow */
import assignStyle from 'css-in-js-utils/lib/assignStyle'

import { isObject, arrayEach } from 'fela-utils'

function extendStyle(
  style: Object,
  extension: Object,
  extendPlugin: Function
): void {
  // extend conditional style objects
  if (extension.hasOwnProperty('condition')) {
    if (extension.condition) {
      assignStyle(style, extendPlugin(extension.style))
    }
  } else {
    // extend basic style objects
    assignStyle(style, extension)
  }
}

function extend(style: Object): Object {
  for (const property in style) {
    const value = style[property]

    if (property === 'extend') {
      const extensions = [].concat(value)

      arrayEach(extensions, extension => extendStyle(style, extension, extend))
      delete style[property]
    } else if (isObject(value)) {
      // support nested extend as well
      style[property] = extend(value)
    }
  }

  return style
}

export default () => extend
