/* @flow weak */
export default function isPseudoSelector(property) {
  return property.charAt(0) === ':'
}
