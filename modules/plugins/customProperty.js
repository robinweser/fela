/* @flow weak */
function customProperty(style, properties) {
  Object.keys(style).forEach(property => {
    const value = style[property]
    if (properties[property]) {
      Object.assign(style, properties[property](value))
      delete style[property]
    }

    if (value instanceof Object && !Array.isArray(value)) {
      style[property] = customProperty(value, properties)
    }
  })

  return style
}

export default properties => style => customProperty(style, properties)
