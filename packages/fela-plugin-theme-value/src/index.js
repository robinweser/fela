import isPlainObject from 'isobject'
import { arrayReduce } from 'fast-loops'

function getThemeValue(object, key) {
  const value = arrayReduce(
    key.split('.'),
    (value, index) => {
      if (isPlainObject(value) && value[index]) {
        return value[index]
      }

      return undefined
    },
    object
  )

  return value || key
}

function resolveThemeValues(style, theme = {}, mapping) {
  for (const property in style) {
    const value = style[property]

    if (typeof value === 'string' && mapping[property]) {
      style[property] = getThemeValue(mapping[property](theme), value)
    } else if (isPlainObject(value)) {
      style[property] = resolveThemeValues(style[property], theme, mapping)
    }
  }

  return style
}

export default function themeValue(mapping = {}) {
  return (style, type, renderer, props) =>
    resolveThemeValues(style, props?.theme, mapping)
}
