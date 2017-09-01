/* @flow */
import transformStyle from 'rtl-css-js'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'
import type NativeRenderer from '../../../flowtypes/NativeRenderer'

type Type = 1 | 2 | 3 | 4 | 5

export default function rtl() {
  return (style: Object) => transformStyle(style)
}
