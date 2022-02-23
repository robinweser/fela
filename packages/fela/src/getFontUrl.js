import isBase64 from './isBase64'

export default function getFontUrl(src) {
  if (isBase64(src)) {
    return src
  }

  return `'${src}'`
}
