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
          normalizedStyle[selector.trim()] = resolvedValue
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
