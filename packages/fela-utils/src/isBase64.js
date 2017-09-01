/* @flow */
export default function isBase64(property: string): boolean {
  return (
    property.charAt(0) === 'd' &&
    property.charAt(1) === 'a' &&
    property.charAt(2) === 't' &&
    property.charAt(3) === 'a' &&
    property.charAt(4) === ':'
  )
}
