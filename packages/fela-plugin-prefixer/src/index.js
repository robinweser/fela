/* @flow */
import { prefix } from 'inline-style-prefixer'
import { prefix as stylisPrefix } from 'stylis'
import {
  cssifyObject,
  cssifyDeclaration,
  camelCaseProperty,
} from 'css-in-js-utils'
import { objectReduce } from 'fast-loops'
import fallbackValue from 'fela-plugin-fallback-value'
import isPlainObject from 'isobject'

const resolveFallbackValues = fallbackValue()

function addVendorPrefixes(style) {
  return objectReduce(
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

addVendorPrefixes.optimized = (props) => {
  const cssDeclaration = cssifyDeclaration(props.property, props.value) + ';'
  const prefixed = stylisPrefix(cssDeclaration, props.property.length)

  if (prefixed !== cssDeclaration) {
    const [property, value] = prefixed.split(/:(.+)/)
    // TODO: do we really need to camelCase here?
    props.property = camelCaseProperty(property)
    props.value = value.slice(0, -1)
  }

  return props
}

export default () => addVendorPrefixes
