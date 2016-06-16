import hypenateStyleName from 'hyphenate-style-name'

/**
 * generates a valid CSS string containing style
 *
 * @param {Object} style - object containing CSS declarations
 * @returns {string} valid CSS string with dash cased properties
 */
export default function cssifyObject(style) {
  return Object.keys(style).reduce((css, prop) => {
    // prevents the semicolon after
    // the last rule declaration
    if (css.length > 0) {
      css += ';'
    }
    css += hypenateStyleName(prop) + ':' + style[prop]
    return css
  }, '')
}
