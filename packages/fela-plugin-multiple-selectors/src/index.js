/* @flow */

import { objectReduce, arrayEach } from 'fast-loops'
import isPlainObject from 'isobject'

function multipleSelectors(style: Object): Object {
  return objectReduce(
    style,
    (normalizedStyle, value, property) => {
      if (isPlainObject(value)) {
        const resolvedValue = multipleSelectors(value)

        arrayEach(property.split(','), (selector) => {
          const key = selector.trim()

          // merge styles with base styles
          const baseStyle = normalizedStyle[key] || {}
          normalizedStyle[key] = {
            ...baseStyle,
            ...resolvedValue,
          }
        })
      } else {
        normalizedStyle[property] = value
      }

      return normalizedStyle
    },
    {}
  )
}

export default () => multipleSelectors
