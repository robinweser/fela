/* @flow weak */
export default function isAttributeSelector(property) {
  return property.charAt(0) === '['
}
