/* @flow weak */
import hyphenateProperty from 'css-in-js-utils/lib/hyphenateProperty'

function resolveFallbackValues(style) {
  for (const property in style) {
    const value = style[property]
    if (Array.isArray(value)) {
      style[property] = value.join(`;${hyphenateProperty(property)}:`)
    } else if (value instanceof Object) {
      style[property] = resolveFallbackValues(value)
    }
  }

  return style
}

export default () => resolveFallbackValues
