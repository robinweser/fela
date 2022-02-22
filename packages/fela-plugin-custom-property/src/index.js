import isPlainObject from 'isobject'
import { assignStyle } from 'css-in-js-utils'

function resolveCustomProperty(style, properties) {
  for (const property in style) {
    const value = style[property]

    if (properties.hasOwnProperty(property)) {
      const resolved = properties[property](value)
      assignStyle(style, resolved)

      if (!resolved.hasOwnProperty(property)) {
        delete style[property]
      }
    }

    if (style.hasOwnProperty(property) && isPlainObject(value)) {
      style[property] = resolveCustomProperty(value, properties)
    }
  }

  return style
}

export default function customProperty(properties) {
  return function customPropertyPlugin(style) {
    return resolveCustomProperty(style, properties)
  }
}
