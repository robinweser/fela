/* @flow weak */
import cssifyObject from './cssifyObject'

export default function cssifyFontFace(fontFace) {
  return `@font-face{${cssifyObject(fontFace)}}`
}
