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
    const value = style[prop]

    // automatically remove undefined values
    if (value === undefined || (typeof value === 'string' && value.indexOf('undefined') > -1)) {
      return css
    }

    // warn if invalid values are rendered
    warning(typeof style[prop] === 'string' || typeof style[prop] === 'number', 'An invalid value "' + style[prop] + '" has been used as "' + prop + '".')

    // prevents the semicolon after
    // the last rule declaration
    if (css.length > 0) {
      css += ';'
    }

    css += hypenateStyleName(prop) + ':' + style[prop]
    return css
  }, '')
}
