/* @flow */
import assignStyle from 'css-in-js-utils/lib/assignStyle'

import isObject from '../utils/isObject'

function resolveCustomProperty(style: Object, properties: Object): Object {
  for (const property in style) {
    const value = style[property]

    if (properties.hasOwnProperty(property)) {
      assignStyle(style, properties[property](value))
      delete style[property]
    }

    if (isObject(value)) {
      style[property] = resolveCustomProperty(value, properties)
    }
  }

  return style
}

export default function customProperty(properties: Object) {
  return (style: Object) => resolveCustomProperty(style, properties)
}
