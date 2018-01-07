/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'
import objectReduce from 'fast-loops/lib/objectReduce'
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

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
