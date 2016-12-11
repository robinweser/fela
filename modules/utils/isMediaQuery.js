/* @flow weak */
export default function isMediaQuery(property) {
  return property.substr(0, 6) === '@media'
}
