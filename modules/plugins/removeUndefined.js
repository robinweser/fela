/* @flow weak */
function isInvalid(value) {
  return value === undefined || typeof value === 'string' && value.indexOf('undefined') > -1
}

function removeUndefined(style) {
  Object.keys(style).forEach(property => {
    const value = style[property]
    if (value instanceof Object && !Array.isArray(value)) {
      style[property] = removeUndefined(value)
    } else if (Array.isArray(value)) {
      style[property] = value.filter(val => !isInvalid(val))
    } else {
      if (isInvalid(value)) {
        delete style[property]
      }
    }
  })

  return style
}


export default () => removeUndefined
