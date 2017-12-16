/* @flow */
export default function isBase64(property: string): boolean {
  return property.substr(0, 5) === 'data:'
}
