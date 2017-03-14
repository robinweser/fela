/* @flow  */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

export default function cssifyFontFace(fontFace: Object): string {
  return `@font-face{${cssifyObject(fontFace)}}`
}
