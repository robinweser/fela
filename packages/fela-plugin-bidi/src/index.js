/* @flow */
import transformStyle from 'bidi-css-js'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

export default function bidi(flowDirection: 'ltr' | 'rtl' = 'ltr') {
  return (
    style: Object,
    type: StyleType,
    renderer: DOMRenderer,
    props: Object
  ) =>
    transformStyle(
      style,
      (props && props.theme && props.theme.direction) || flowDirection
    )
}
