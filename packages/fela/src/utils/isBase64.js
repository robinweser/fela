/* @flow */
export default function isBase64(property: string): boolean {
  return property.indexOf('data:') !== -1
}
