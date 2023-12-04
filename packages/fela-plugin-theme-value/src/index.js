import isPlainObject from 'isobject'
import { arrayReduce } from 'fast-loops'

function getThemeValue(object, key) {
  const value = arrayReduce(
    key.split('.'),
    (currentValue, index) => {
      if (isPlainObject(currentValue) && currentValue[index]) {
        return currentValue[index]
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
  return function themeValuePlugin(style, type, renderer, props) {
    return resolveThemeValues(style, props?.theme, mapping)
  }
}
