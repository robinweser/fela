/* @flow */
import prefix from 'inline-style-prefixer/static'
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

import { resolveFallbackValues } from './fallbackValue'

import isObject from '../utils/isObject'
import objectReduce from '../utils/objectReduce'

function addVendorPrefixes(style: Object): Object {
  return objectReduce(
    style,
    (prefixedStyle, value, property) => {
      if (isObject(value)) {
        prefixedStyle[property] = addVendorPrefixes(value)
      } else {
        const prefixedDeclaration = prefix({ [property]: style[property] })
        const styleKeys = Object.keys(prefixedDeclaration)

        const referenceProperty = styleKeys[0]
        const referenceValue = prefixedDeclaration[referenceProperty]

        if (styleKeys.length === 1) {
          prefixedStyle[referenceProperty] = referenceValue
        } else {
          delete prefixedDeclaration[referenceProperty]
          const inlinedProperties = cssifyObject(
            resolveFallbackValues(prefixedDeclaration)
          )

          prefixedStyle[
            referenceProperty
          ] = `${referenceValue};${inlinedProperties}`
        }
      }

      return prefixedStyle
    },
    {}
  )
}

export default function prefixer() {
  return addVendorPrefixes
}
