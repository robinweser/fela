import camelToDashCase from '../../../utils/camelToDashCase'

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
