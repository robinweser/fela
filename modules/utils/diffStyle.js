/**
 * diffs a style object against a base style object
 *
 * @param {Object} style - style object which is diffed
 * @param {Object?} base - base style object
 */
export default function diffStyle(style, base = { }) {
  return Object.keys(style).reduce((diff, property) => {
    const value = style[property]
    // recursive object iteration in order to render
    // pseudo class and media class declarations
    if (value instanceof Object && !Array.isArray(value)) {
      const nestedDiff = diffStyle(value, base[property])
      if (Object.keys(nestedDiff).length > 0) {
        diff[property] = nestedDiff
      }
    } else {
      // diff styles with the base styles to only extract dynamic styles
      if (value !== undefined && !base.hasOwnProperty(property) || base[property] !== value) {
        // remove concatenated string values including `undefined`
        if (typeof value === 'string' && value.indexOf('undefined') > -1) {
          return diff
        }
        diff[property] = value
      }
    }
    return diff
  }, { })
}
