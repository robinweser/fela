import { objectReduce } from 'fast-loops'
import { camelCaseProperty } from 'css-in-js-utils'
import isPlainObject from 'isobject'

function normalizeKebabCase(style) {
  return objectReduce(
    style,
    (normalizedStyle, value, property) => {
      if (isPlainObject(value)) {
        normalizedStyle[property] = normalizeKebabCase(value)
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

export default () => normalizeKebabCase
