/* @flow */
export default function isSupport(property: string): boolean {
  return property.substr(0, 9) === '@supports'
}
