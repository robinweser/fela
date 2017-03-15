/* @flow  */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

type FontProperties = {
  fontVariant?: string,
  fontStretch?: string,
  fontWeight?: string | number,
  fontStyle?: string,
  unicodeRange?: string
};

type FontFace = FontProperties & {| fontFamily: string, src: string |};

export default function cssifyFontFace(fontFace: FontFace): string {
  return `@font-face{${cssifyObject(fontFace)}}`
}
