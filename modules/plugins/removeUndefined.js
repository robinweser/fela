/* @flow weak */
function isInvalid(value) {
  return value === undefined || typeof value === 'string' && value.indexOf('undefined') > -1
}

function removeUndefined(style) {
  for (const property in style) {
    const value = style[property]
    if (Array.isArray(value)) {
      style[property] = value.filter(val => !isInvalid(val))
    } else if (value instanceof Object) {
      style[property] = removeUndefined(value)
    } else if (isInvalid(value)) {
      delete style[property]
    }
  }

  return style
}

export default () => removeUndefined
