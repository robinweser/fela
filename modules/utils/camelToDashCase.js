/**
 * converts camel cased to dash cased properties
 *
 * @param {string} property - camel cased CSS property
 * @returns {string} dash cased CSS property
 */
export default function camelToDashCase(property) {
  return property.replace(/([a-z]|^)([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase()).replace('ms-', '-ms-')
}
