/** 
 * converts camel cased to dash cased properties
 *
 * @param {string} property - camel cased CSS property
 * @returns {string} dash cased CSS property 
 */
function camelToDashCase(property) {
  return property.replace(/([a-z]|^)([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase()).replace('ms-', '-ms-')
}

/** 
 * generates a valid CSS string containing styles
 *
 * @param {Object} styles - object containing CSS declarations
 * @returns {string} valid CSS string with dash cased properties
 */
export default function cssifyObject(styles) {
  return Object.keys(styles).reduce((css, prop) => {
    // prevents the semicolon after
    // the last rule declaration
    if (css.length > 0) {
      css += ';'
    }
    css += camelToDashCase(prop) + ':' + styles[prop]
    return css
  }, '')
}