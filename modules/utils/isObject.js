/* @flow */
export default function isObject(value: any): boolean {
  return typeof value === 'object' && !Array.isArray(value)
}
