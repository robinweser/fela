import cssifyObject from './cssifyObject'

/**
 * renders clustered style into a CSS string
 *
 * @param {Object} style - prepared style with pseudo keys
 * @param {string} className - className reference to render
 * @return {string} valid CSS string
 */
export default function cssifyClusteredStyle(style, className) {
  return Object.keys(style).reduce((css, pseudo) => {
    return css + '.' + className + pseudo + '{' + cssifyObject(style[pseudo]) + '}'
  }, '')
}
