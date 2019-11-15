/* @flow */
import isPlainObject from 'isobject'
import assignStyle from 'css-in-js-utils/lib/assignStyle'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

function resolveNamedKeys(style: Object, keys: Object) {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      const resolvedValue = resolveNamedKeys(value, keys)

      if (keys.hasOwnProperty(property)) {
        const resolvedKey = keys[property]
        if (style.hasOwnProperty(resolvedKey)) {
          style[resolvedKey] = assignStyle(style[resolvedKey], resolvedValue)
        } else {
          style[resolvedKey] = resolvedValue
        }

        // We clean the old keys as they're not used anymore
        delete style[property]
      }
    }
  }

  return style
}

export default function namedKeys(keys: Object | Function) {
  return (
    style: Object,
    type: StyleType,
    renderer: DOMRenderer,
    props: Object
  ) => resolveNamedKeys(style, keys instanceof Function ? keys(props) : keys)
}
