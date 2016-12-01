/* @flow weak */
import hypenateStyleName from 'hyphenate-style-name'
import warning from './warning'

/**
 * generates a valid CSS string containing style
 *
 * @param {Object} style - object containing CSS declarations
 * @returns {string} valid CSS string with dash cased properties
 */
export default function cssifyObject(style) {
  return Object.keys(style).reduce((css, prop) => {
    // warn if invalid values are rendered
    warning(typeof style[prop] === 'string' || typeof style[prop] === 'number', 'The invalid value `' + style[prop] + '` has been used as `' + prop + '`.')

    // prevents the semicolon after
    // the last rule declaration
    if (css.length > 0) {
      css += ';'
    }

    css += hypenateStyleName(prop) + ':' + style[prop]
    return css
  }, '')
}
