/* @flow  */
export default function toCSSString(value: string): string {
  if (value.charAt(0) === '"') {
    return value
  }

  return `"${value}"`
}
