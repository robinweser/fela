/* @flow weak */
/**
 * generates a hashcode from a string
 * taken from http://stackoverflow.com/a/7616484
 *
 * @param {string} str - str used to generate the unique hash code
 * @return {string} compressed content hash
 */
export default function generateContentHash(str) {
  let hash = 0
  let iterator = 0
  let char
  const length = str.length

  // return a `s` for empty strings
  // to symbolize `static`
  if (length === 0) {
    return ''
  }

  for (; iterator < length; ++iterator) {
    char = str.charCodeAt(iterator)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }

  return '-' + hash.toString(36)
}
