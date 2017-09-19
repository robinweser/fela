/* @flow */
import transformStyle from 'bidi-css-js'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'
import type NativeRenderer from '../../../flowtypes/NativeRenderer'

type Type = 1 | 2 | 3 | 4 | 5

export default function bidi(flowDirection: 'ltr' | 'rtl') {
  return (style: Object) => transformStyle(style, flowDirection)
}
