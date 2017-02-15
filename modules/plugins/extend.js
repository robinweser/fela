/* @flow weak */
/* eslint-disable no-use-before-define */

import assignStyles from '../utils/assignStyles'

function extendStyle(style, extension) {
  // extend conditional style objects
  if (extension.hasOwnProperty('condition')) {
    if (extension.condition) {
      assignStyles(style, extend(extension.style))
    }
  } else {
    // extend basic style objects
    assignStyles(style, extension)
  }
}

function extend(style) {
  for (const property in style) {
    const value = style[property]
    if (property === 'extend') {
      // arrayify to loop each extension to support arrays and single extends
      const extensions = [].concat(value)
      for (let i = 0, len = extensions.length; i < len; ++i) {
        extendStyle(style, extensions[i])
      }
      delete style[property]
    } else if (value instanceof Object && !Array.isArray(value)) {
      // support nested extend as well
      style[property] = extend(value)
    }
  }

  return style
}

export default () => extend
