import { objectReduce } from 'fast-loops'
import { camelCaseProperty } from 'css-in-js-utils'
import isPlainObject from 'isobject'

function kebabCasePlugin(style) {
  return objectReduce(
    style,
    (normalizedStyle, value, property) => {
      if (isPlainObject(value)) {
        normalizedStyle[property] = kebabCasePlugin(value)
      } else {
        if (property.indexOf('-') !== -1) {
          normalizedStyle[camelCaseProperty(property)] = value
        } else {
          normalizedStyle[property] = value
        }
      }

      return normalizedStyle
    },
    {}
  )
}

export default function kebabCase() {
  return kebabCasePlugin
}
