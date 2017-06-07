/* @flow */
import warning from './warning'
import isBase64 from './isBase64'

const formats: { [string]: string } = {
  '.woff': 'woff',
  '.eot': 'embedded-opentype',
  '.ttf': 'truetype',
  '.otf': 'opentype',
  '.svg': 'svg',
  '.svgz': 'svg'
}

const base64Formats: { [string]: string } = {
  'image/svg+xml': 'svg',
  'application/x-font-woff': 'woff',
  'application/font-woff': 'woff',
  'application/x-font-woff2': 'woff2',
  'application/font-woff2': 'woff2',
  'font/woff2': 'woff2',
  'application/octet-stream': 'truetype',
  'application/x-font-ttf': 'truetype',
  'application/x-font-truetype': 'truetype',
  'application/x-font-opentype': 'opentype',
  'application/vnd.ms-fontobject': 'embedded-opentype',
  'application/font-sfnt': 'sfnt'
}

export default function checkFontFormat(src: string): string {
  if (isBase64(src)) {
    let mime = ''
    for (let i = 5; ; i++) { // 'data:'.length === 5
      const c = src.charAt(i)

      if (c === ';' || c === ',') {
        break
      }

      mime += c
    }

    const fmt = base64Formats[mime]
    if (fmt) {
      return fmt
    }

    warning(
      true,
      `A invalid base64 font was used. Please use one of the following mime type: ${Object.keys(base64Formats).join(', ')}.`
    )
  } else {
    let extension = ''
    for (let i = src.length - 1; ; i--) {
      const c = src.charAt(i)

      if (c === '.') {
        extension = c + extension
        break
      }

      extension = c + extension
    }

    const fmt = formats[extension]
    if (fmt) {
      return fmt
    }

    warning(
      true,
      `A invalid font-format was used in "${src}". Use one of these: ${Object.keys(formats).join(', ')}.`
    )
  }
  return ''
}
