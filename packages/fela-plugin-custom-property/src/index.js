/* @flow */
import isPlainObject from 'isobject'
import assignStyle from 'css-in-js-utils/lib/assignStyle'

function resolveCustomProperty(style: Object, properties: Object): Object {
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

export default function customProperty(properties: Object) {
  return (style: Object) => resolveCustomProperty(style, properties)
}
