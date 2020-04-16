/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

export default function cssifyKeyframeRule(frames: Object) {
  return objectReduce(
    frames,
    (css, frame, percentage) => `${css}${percentage}{${cssifyObject(frame)}}`,
    ''
  )
}
