/* @flow weak */
import hypenateStyleName from 'hyphenate-style-name'

function fallbackValue(style) {
  Object.keys(style).forEach(property => {
    const value = style[property]
    if (Array.isArray(value)) {
      style[property] = value.join(';' + hypenateStyleName(property) + ':')
    } else if (value instanceof Object) {
      style[property] = fallbackValue(value)
    }
  })

  return style
}

export default () => fallbackValue
