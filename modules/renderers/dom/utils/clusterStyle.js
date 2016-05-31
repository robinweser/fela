import isMediaQuery from './isMediaQuery'
import isPseudoClass from './isPseudoClass'

/**
 * flattens nested pseudo classes
 * removes all invalid properties that are not either a string or a number
 *
 * @param {Object} styles - dynamic styles
 * @return {Object} flat and validated styles
 */
export default function clusterStyle(styles, pseudo = '', media = '', out = { }) {
  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (value instanceof Object && !Array.isArray(value)) {
      if (isPseudoClass(property)) {
        clusterStyle(value, pseudo + property, media, out)
      } else if (isMediaQuery(property)) {
        const query = property.slice(6).trim()
        const nestedMedia = media !== '' ? media + ' and ' + query : query
        clusterStyle(value, pseudo, nestedMedia, out)
      }
    } else {
      // TODO: truly ugly, refactor if possible
      if (!out[media]) {
        out[media] = { [ pseudo]: { } }
      }
      if (!out[media][pseudo]) {
        out[media][pseudo] = { }
      }
      out[media][pseudo][property] = value
    }
  })

  return out
}