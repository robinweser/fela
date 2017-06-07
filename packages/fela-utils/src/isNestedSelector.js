/* @flow */
const regex = /^(:|\[|>|&)/

export default function isNestedSelector(property: string): boolean {
  return regex.test(property)
}
