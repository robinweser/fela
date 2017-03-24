/* @flow */
export default function isMediaQuery(property: string): boolean {
  return property.substr(0, 6) === '@media'
}
