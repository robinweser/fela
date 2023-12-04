import { prefix as stylisPrefix } from 'stylis'
import { cssifyDeclaration, camelCaseProperty } from 'css-in-js-utils'
import { objectReduce } from 'fast-loops'
import isPlainObject from 'isobject'

function addVendorPrefixes(style) {
  return objectReduce(
    style,
    (prefixedStyle, value, property) => {
      if (isPlainObject(value)) {
        prefixedStyle[property] = addVendorPrefixes(value)
      } else {
        const cssDeclaration = cssifyDeclaration(property, value) + ';'
        const prefixed = stylisPrefix(cssDeclaration, property.length)

        if (prefixed !== cssDeclaration) {
          const [prefixProperty, prefixValue] = prefixed.split(/:([\S\s]+)/)
          // TODO: do we really need to camelCase here?
          prefixedStyle[camelCaseProperty(prefixProperty)] = prefixValue.slice(
            0,
            -1
          )
        } else {
          prefixedStyle[property] = value
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
    const [property, value] = prefixed.split(/:([\S\s]+)/)
    // TODO: do we really need to camelCase here?
    props.property = camelCaseProperty(property)
    props.value = value.slice(0, -1)
  }

  return props
}

export default () => addVendorPrefixes
