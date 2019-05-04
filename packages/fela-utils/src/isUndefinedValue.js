/* @flow */
export default function isUndefinedValue(value: any): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.match(/(undefined|null)/) !== null)
  )
}
