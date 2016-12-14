
/* @flow weak */
export default function isChildSelector(property) {
  return property.charAt(0) === '>'
}
