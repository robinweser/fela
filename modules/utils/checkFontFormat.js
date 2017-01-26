/* @flow weak */
const formats = {
  '.woff': 'woff',
  '.eot': 'eot',
  '.ttf': 'truetype',
  '.svg': 'svg'
}

const extensions = Object.keys(formats)

export default function checkFontFormat(src) {
  for (let i = 0, len = extensions.length; i < len; ++i) {
    const extension = extensions[i]
    if (src.indexOf(extension) !== -1) {
      return formats[extension]
    }
  }
  // TODO: warning: wrong font format
  return undefined
}
