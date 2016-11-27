/* @flow weak */
/**
 * stringifies an object without any special character
 * uses a sort version of the obj to get same hash codes
 *
 * @param {Object} obj - obj that gets stringified
 * @return {string} stringyfied sorted object
 */
export default function sortedStringify(obj) {
  return Object.keys(obj).sort().reduce((str, prop) => {
    // only concatenate property and value
    // without any special characters
    return str + prop + getFlatValue(obj[prop])
  }, '')
}

export function getFlatValue(value) {
  // join arrays
  if (Array.isArray(value)) {
    return value.join('-')
  }

  // stringify objects
  if (value instanceof Object) {
    return sortedStringify(value)
  }

  // return the basic value
  return value
}
