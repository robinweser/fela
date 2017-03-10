/* @flow weak */
const regex = /^(:|\[|>|&)/

export default function isNestedSelector(property) {
  return regex.test(property)
}
