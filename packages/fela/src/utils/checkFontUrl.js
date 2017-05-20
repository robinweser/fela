/* @flow */
import isBase64 from './isBase64'

export default function checkFontUrl(src: string): string {
  if (isBase64(src)) {
    return src
  }

  return `'${src}'`
}
