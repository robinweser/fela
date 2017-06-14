/* @flow */
import { isObject } from 'fela-utils'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

type Type = 1 | 2 | 3 | 4 | 5

function embedded(style: Object, type: Type, renderer: DOMRenderer): Object {
  for (const property in style) {
    const value = style[property]

    if (property === 'fontFace' && isObject(value)) {
      const { fontFamily, src, ...otherProps } = value
      if (typeof fontFamily === 'string' && Array.isArray(src)) {
        style.fontFamily = renderer.renderFont(fontFamily, src, otherProps)
        delete style.fontFace
      } else {
        // TODO: warning - invalid font data
      }
    } else if (property === 'animationName' && isObject(value)) {
      style[property] = renderer.renderKeyframe(() => value)
    } else if (isObject(value)) {
      embedded(value, type, renderer)
    }
  }

  return style
}

export default () => embedded
