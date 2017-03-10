/* @flow weak */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

export default function cssifyFontFace(fontFace) {
  return `@font-face{${cssifyObject(fontFace)}}`
}
