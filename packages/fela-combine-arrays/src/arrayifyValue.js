/* @flow */
export default function arrayify(value: any): Array<any> {
  if (Array.isArray(value)) {
    return value
  }

  if (value !== undefined) {
    return [value]
  }

  return []
}
