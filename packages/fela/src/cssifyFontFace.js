import { cssifyObject } from 'css-in-js-utils'

export default function cssifyFontFace(fontFace) {
  return `@font-face{${cssifyObject(fontFace)}}`
}
