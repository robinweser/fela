/* @flow weak */
import assignStyle from 'css-in-js-utils/lib/assignStyle'

function customProperty(style, properties) {
  for (const property in style) {
    const value = style[property]
    if (properties[property]) {
      assignStyle(style, properties[property](value))
      delete style[property]
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      style[property] = customProperty(value, properties)
    }
  }

  return style
}

export default properties => style => customProperty(style, properties)
