/* @flow */
import isPlainObject from 'isobject'
import assignStyle from 'css-in-js-utils/lib/assignStyle'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

function resolveHoverStyles(style: Object) {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      const resolvedValue = resolveHoverStyles(value)

      if (property === ':hover' || property === '&:hover') {
        style['@media (hover: hover)'] = {
          [property]: resolvedValue,
        }

        // Remove the old hover style
        delete style[property]
      } else {
        style[property] = resolvedValue
      }
    }
  }

  return style
}

export default function hoverMedia() {
  return (
    style: Object,
    type: StyleType,
    renderer: DOMRenderer,
    props: Object
  ) => resolveHoverStyles(style)
}
