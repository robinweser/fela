/* @flow weak */
import assignStyles from '../utils/assignStyles'

function customProperty(style, properties) {
  for (const property in style) {
    const value = style[property]
    if (properties[property]) {
      assignStyles(style, properties[property](value))
      delete style[property]
    }

    if (value instanceof Object && !Array.isArray(value)) {
      style[property] = customProperty(value, properties)
    }
  }

  return style
}

export default properties => style => customProperty(style, properties)
