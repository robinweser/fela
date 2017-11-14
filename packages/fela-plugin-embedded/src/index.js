/* @flow */
import { isObject, arrayReduce } from 'fela-utils'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

type Type = 1 | 2 | 3 | 4 | 5

function renderFontFace({ fontFamily, src, ...otherProps }, renderer) {
  if (typeof fontFamily === 'string' && Array.isArray(src)) {
    return renderer.renderFont(fontFamily, src, otherProps)
  }

  // TODO: warning - invalid font data
}

function embedded(style: Object, type: Type, renderer: DOMRenderer): Object {
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
          .map(frame => renderer.renderKeyframe(() => frame))
          .join(',')
      } else {
        style[property] = renderer.renderKeyframe(() => value)
      }
    } else if (isObject(value)) {
      embedded(value, type, renderer)
    }
  }

  return style
}

export default () => embedded
