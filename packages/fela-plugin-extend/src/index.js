/* @flow */
import { isObject, arrayEach, objectEach } from 'fela-utils'

import type { StyleType } from '../../../flowtypes/StyleType'
import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { NativeRenderer } from '../../../flowtypes/NativeRenderer'

function extendStyle(
  style: Object,
  extension: Object,
  extendPlugin: Function,
  renderer: DOMRenderer | NativeRenderer
): void {
  // extend conditional style objects
  if (extension.hasOwnProperty('condition')) {
    if (extension.condition) {
      renderer._mergeStyle(style, extendPlugin(extension.style))
    }
  } else {
    // extend basic style objects
    renderer._mergeStyle(style, extension)
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
        extendStyle(style, extension, extend, renderer)
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
