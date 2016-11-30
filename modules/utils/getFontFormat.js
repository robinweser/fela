/* @flow weak */
const formats = {
  '.woff': 'woff',
  '.eot': 'eot',
  '.ttf': 'truetype',
  '.svg': 'svg'
}

// Returns the font format for a specific font source
export default function getFontFormat(src) {
  return Object.keys(formats).reduce((format, extension) => {
    if (src.indexOf(extension) > -1) {
      format = formats[extension]
    }
    return format; // eslint-disable-line
  }, undefined)
}
