/* @flow */
import { isObject, arrayEach, objectEach } from 'fela-utils'
import assignStyle from 'css-in-js-utils/lib/assignStyle'

import type { StyleType } from '../../../flowtypes/StyleType'
import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'

function extendStyle(
  style: Object,
  extension: Object,
  extendPlugin: Function,
  type: StyleType,
  renderer: DOMRenderer | NativeRenderer
): void {
  const merge = renderer._mergeStyle || assignStyle

  // extend conditional style objects
  if (extension.hasOwnProperty('condition')) {
    if (extension.condition) {
      merge(style, extendPlugin(extension.style, type, renderer))
    }
  } else {
    // extend basic style objects
    merge(style, extension)
  }
}

function extend(
  style: Object,
  type: StyleType,
  renderer: DOMRenderer | NativeRenderer
): Object {
  objectEach(style, (value, property) => {
    if (property === 'extend') {
      const extensions = [].concat(value)

      arrayEach(extensions, extension =>
        extendStyle(style, extension, extend, type, renderer)
      )
      delete style[property]
    } else if (isObject(value)) {
      // support nested extend as well
      style[property] = extend(value, type, renderer)
    }
  })

  return style
}

export default () => extend
