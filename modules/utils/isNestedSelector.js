/* @flow weak */
export default function isNestedSelector(property) {
  return property.match(/^(:|\[|>|&)/g) !== null
}
