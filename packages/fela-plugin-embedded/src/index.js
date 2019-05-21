/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'
import isPlainObject from 'isobject'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

function renderFontFace({ fontFamily, src, ...otherProps }, renderer) {
  if (typeof fontFamily === 'string' && Array.isArray(src)) {
    return renderer.renderFont(fontFamily, src, otherProps)
  }

  // TODO: warning - invalid font data
  return undefined
}

function embedded(
  style: Object,
  type: StyleType,
  renderer: DOMRenderer,
  props: Object
): Object {
  for (const property in style) {
    const value = style[property]

    if (property === 'fontFace' && typeof value === 'object') {
      if (Array.isArray(value)) {
        style.fontFamily = arrayReduce(
          value,
          (fontFamilyList, fontFace) => {
            const fontFamily = renderFontFace(fontFace, renderer)

            if (fontFamily && fontFamilyList.indexOf(fontFamily) === -1) {
              fontFamilyList.push(fontFamily)
            }

            return fontFamilyList
          },
          []
        ).join(',')
      } else {
        style.fontFamily = renderFontFace(value, renderer)
      }
      delete style.fontFace
    } else if (property === 'animationName' && typeof value === 'object') {
      if (Array.isArray(value)) {
        style[property] = value
          .map(frame => renderer.renderKeyframe(() => frame), props)
          .join(',')
      } else {
        style[property] = renderer.renderKeyframe(() => value, props)
      }
    } else if (isPlainObject(value)) {
      embedded(value, type, renderer, props)
    }
  }

  return style
}

export default () => embedded
