/* @flow */
import warning from './warning'
import isBase64 from './isBase64'

const formats = {
  '.woff': 'woff',
  '.eot': 'eot',
  '.ttf': 'truetype',
  '.svg': 'svg'
}

const base64Formats = {
  'image/svg+xml': 'svg',
  'application/x-font-woff': 'woff',
  'application/font-woff': 'woff',
  'application/x-font-woff2': 'woff2',
  'application/font-woff2': 'woff2',
  'font/woff2': 'woff2',
  'application/octet-stream': 'ttf',
  'application/x-font-ttf': 'ttf',
  'application/x-font-truetype': 'ttf',
  'application/x-font-opentype': 'otf',
  'application/vnd.ms-fontobject': 'eot',
  'application/font-sfnt': 'sfnt'
}

const extensions = Object.keys(formats)
const base64MimeTypes = Object.keys(base64Formats)

export default function checkFontFormat(src: string): string {
  for (let i = 0, len = extensions.length; i < len; ++i) {
    const extension = extensions[i]
    if (src.indexOf(extension) !== -1) {
      return formats[extension]
    }
  }

  if (isBase64(src)) {
    for (let i = 0, len = base64MimeTypes.length; i < len; ++i) {
      const mimeType = base64MimeTypes[i]
      if (src.indexOf(mimeType) !== -1) {
        return base64Formats[mimeType]
      }
    }

    warning(
        true,
        `A invalid base64 font was used. Please use one of the following mime type: ${Object.keys(base64Formats).join(', ')}.`
    )
  } else {
    warning(
        true,
        `A invalid font-format was used in "${src}". Use one of these: ${Object.keys(formats).join(', ')}.`
    )
  }
  return ''
}
