/* @flow weak */
import assignStyle from 'css-in-js-utils/lib/assignStyle'

import isObject from '../utils/isObject'

function customProperty(style, properties) {
  for (const property in style) {
    const value = style[property]

    if (properties.hasOwnProperty(property)) {
      assignStyle(style, properties[property](value))
      delete style[property]
    }

    if (isObject(value)) {
      style[property] = customProperty(value, properties)
    }
  }

  return style
}

export default properties => style => customProperty(style, properties)
