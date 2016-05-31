import isMediaQuery from './isMediaQuery'
import isPseudoClass from './isPseudoClass'

/**
 * removes every invalid property except pseudo class objects
 *
 * @param {Object} style - style to be validated
 * @return {Object} validated style
 */
export default function validateStyle(style) {
  Object.keys(style).forEach(property => {
    const value = style[property]
    if (value instanceof Object && !Array.isArray(value)) {
      style[property] = isPseudoClass(property) || isMediaQuery(property) ? validateStyle(value) : {}
      if (Object.keys(style[property]).length === 0) {
        delete style[property]
      }
    } else if (typeof value !== 'string' && typeof value !== 'number') {
      delete style[property]
    }
  })

  return style
}