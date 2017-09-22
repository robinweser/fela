/* @flow */
import transformStyle from 'bidi-css-js'

export default function bidi(flowDirection: 'ltr' | 'rtl') {
  return (style: Object) => transformStyle(style, flowDirection)
}
