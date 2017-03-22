/* @flow */
export default function isUndefinedValue(value: any): boolean {
  return value === undefined ||
    (typeof value === 'string' && value.indexOf('undefined') !== -1)
}
