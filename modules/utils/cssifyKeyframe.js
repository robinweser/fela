/* @flow weak */
import cssifyObject from './cssifyObject'

/**
 * renders keyframes into a CSS string with all prefixes
 *
 * @param {Object} frames - validated frame declarations
 * @param {string} animationName - animation reference naming
 * @param {string[]} prefixes - list of used vendor prefixes
 * @return {string} valid CSS string
 */
export default function cssifyKeyframe(frames, animationName, prefixes = [ '' ]) {
  const keyframe = Object.keys(frames).reduce((css, percentage) => {
    return css + percentage + '{' + cssifyObject(frames[percentage]) + '}'
  }, '')

  return prefixes.reduce((css, prefix) => {
    return css + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}'
  }, '')
}
