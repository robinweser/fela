/* @flow */
import warning from './warning'

const formats = {
  '.woff': 'woff',
  '.eot': 'eot',
  '.ttf': 'truetype',
  '.svg': 'svg'
}

const extensions = Object.keys(formats)

export default function checkFontFormat(src: string): string {
  for (let i = 0, len = extensions.length; i < len; ++i) {
    const extension = extensions[i]
    if (src.indexOf(extension) !== -1) {
      return formats[extension]
    }
  }

  warning(
    true,
    `A invalid font-format was used in "${src}". Use one of these: ${Object.keys(formats).join(', ')}.`
  )
  return ''
}
