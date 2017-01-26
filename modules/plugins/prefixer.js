/* @flow weak */
import prefix from 'inline-style-prefixer/static'

import fallbackValue from './fallbackValue'
import cssifyObject from '../utils/cssifyObject'

const resolveFallbackValues = fallbackValue()

// TODO: refactor this messy piece of code
// into clean, performant equivalent
function addVendorPrefixes(style) {
  const prefixedStyle = {}

  for (const property in style) {
    const value = style[property]
    if (value instanceof Object && !Array.isArray(value)) {
      prefixedStyle[property] = addVendorPrefixes(value)
    } else {
      const declaration = { [property]: style[property] }
      const prefixedDeclaration = resolveFallbackValues(prefix(declaration))

      const referenceProperty = Object.keys(prefixedDeclaration)[0]
      const referenceValue = prefixedDeclaration[referenceProperty]
      delete prefixedDeclaration[referenceProperty]
      const inlinedProperties = cssifyObject(prefixedDeclaration)
      prefixedStyle[referenceProperty] = referenceValue +
        (inlinedProperties ? `;${inlinedProperties}` : '')
    }
  }

  return prefixedStyle
}

export default () => addVendorPrefixes
