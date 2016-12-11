/* @flow weak */
export default function toCSSString(value) {
  if (value.charAt(0) === '"') {
    return value
  }
  return '"' + value + '"'
}
