/* @flow */
import transformStyle from 'rtl-css-js'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

export default function rtl(defaultDirection: 'rtl' | 'ltr' = 'rtl') {
  return (
    style: Object,
    type: StyleType,
    renderer: DOMRenderer,
    props: Object
  ) => {
    const direction =
      (props && props.theme && props.theme.direction) || defaultDirection

    if (direction === 'rtl') {
      return transformStyle(style)
    }

    return style
  }
}
