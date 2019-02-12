/* @flow */
import transformStyle from 'rtl-css-js'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

export default function rtl() {
  return (
    style: Object,
    type: StyleType,
    renderer: DOMRenderer,
    props: Object
  ) => {
    if (props && props.theme && props.theme.direction === 'ltr') {
      return style
    }

    return transformStyle(style)
  }
}
