/* @flow weak */
import cssifyObject from './cssifyObject'

export default function cssifyKeyframe(frames, animationName, prefixes = [ '' ]) {
  const keyframe = Object.keys(frames).reduce((css, percentage) => {
    return css + percentage + '{' + cssifyObject(frames[percentage]) + '}'
  }, '')

  return prefixes.reduce((css, prefix) => {
    return css + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}'
  }, '')
}
