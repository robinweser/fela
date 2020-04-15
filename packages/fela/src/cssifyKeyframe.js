/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'

import cssifyKeyframeRule from './cssifyKeyframeRule'

export default function cssifyKeyframe(
  frames: Object,
  animationName: string,
  prefixes: Array<string> = [''],
  prerendered: ?string
): string {
  const keyframe = prerendered || cssifyKeyframeRule(frames)

  return arrayReduce(
    prefixes,
    (cssKeyframe, prefix) =>
      `${cssKeyframe}@${prefix}keyframes ${animationName}{${keyframe}}`,
    ''
  )
}
