/* @flow weak */
import hyphenateStyleName from 'hyphenate-style-name'

function resolveFallbackValues(style) {
  for (const property in style) {
    const value = style[property]
    if (Array.isArray(value)) {
      style[property] = value.join(`;${hyphenateStyleName(property)}:`)
    } else if (value instanceof Object) {
      style[property] = resolveFallbackValues(value)
    }
  }

  return style
}

export default () => resolveFallbackValues
