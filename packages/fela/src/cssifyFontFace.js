/* @flow */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

import type { FontFace } from '../../../flowtypes/FontFace'

export default function cssifyFontFace(fontFace: FontFace): string {
  return `@font-face{${cssifyObject(fontFace)}}`
}
