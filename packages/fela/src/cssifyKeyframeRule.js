import { objectReduce } from 'fast-loops'
import { cssifyObject } from 'css-in-js-utils'

export default function cssifyKeyframeRule(frames) {
  return objectReduce(
    frames,
    (css, frame, percentage) => `${css}${percentage}{${cssifyObject(frame)}}`,
    ''
  )
}
