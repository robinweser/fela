import { arrayReduce } from 'fast-loops'

import cssifyKeyframeRule from './cssifyKeyframeRule'

export default function cssifyKeyframe(
  frames,
  animationName,
  prefixes = [''],
  prerendered
) {
  const keyframe = prerendered || cssifyKeyframeRule(frames)

  return arrayReduce(
    prefixes,
    (cssKeyframe, prefix) =>
      `${cssKeyframe}@${prefix}keyframes ${animationName}{${keyframe}}`,
    ''
  )
}
