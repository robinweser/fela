/* @flow weak */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

export default function cssifyKeyframe(frames, animationName, prefixes = ['']) {
  let keyframe = ''

  for (const percentage in frames) {
    keyframe += `${percentage}{${cssifyObject(frames[percentage])}}`
  }

  let css = ''

  for (let i = 0, len = prefixes.length; i < len; ++i) {
    css += `@${prefixes[i]}keyframes ${animationName}{${keyframe}}`
  }

  return css
}
