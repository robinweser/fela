/* @flow  */
import cssifyObject from './cssifyObject'

export default function cssifyFontFace(fontFace: Object): string {
  return `@font-face{${cssifyObject(fontFace)}}`
}
