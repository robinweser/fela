/* @flow */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

import arrayReduce from './arrayReduce'
import objectReduce from './objectReduce'

export default function cssifyKeyframe(
  frames: Object,
  animationName: string,
  prefixes: Array<string> = ['']
): string {
  const keyframe = objectReduce(
    frames,
    (css, frame, percentage) => `${css}${percentage}{${cssifyObject(frame)}}`,
    ''
  )

  return arrayReduce(
    prefixes,
    (cssKeyframe, prefix) =>
      `${cssKeyframe}@${prefix}keyframes ${animationName}{${keyframe}}`,
    ''
  )
}
