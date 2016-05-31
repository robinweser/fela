/**
 * extracts all dynamic style by diffing with the static base style
 *
 * @param {Object} style - dynamic style
 * @param {Object} base - static base style to diff
 * @return {Object} encapsulated dynamic style
 */
export default function extractDynamicStyle(style, base) {
  Object.keys(style).forEach(property => {
    const value = style[property]
    if (value instanceof Object && !Array.isArray(value)) {
      // also diff inner objects such as pseudo classes
      style[property] = extractDynamicStyle(style[property], base[property])
      if (Object.keys(style[property]).length === 0) {
        delete style[property]
      }
    // checks if the base style has the property and if the value is equal
    } else if (base.hasOwnProperty(property) && base[property] === value) {
      delete style[property]
    }
  })

  return style
}
