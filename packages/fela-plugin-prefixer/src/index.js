/* @flow */
import prefix from 'inline-style-prefixer/static'
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'
import isPlainObject from 'lodash/isPlainObject'
import reduce from 'lodash/reduce'

import fallbackValue from 'fela-plugin-fallback-value'

const resolveFallbackValues = fallbackValue()

function addVendorPrefixes(style: Object): Object {
  return reduce(
    style,
    (prefixedStyle, value, property) => {
      if (isPlainObject(value)) {
        prefixedStyle[property] = addVendorPrefixes(value)
      } else {
        const prefixedDeclaration = prefix({
          [property]: style[property],
        })
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

export default () => addVendorPrefixes
