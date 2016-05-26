const formats = {
  '.woff': 'woff',
  '.eof': 'eof',
  '.ttf': 'truetype',
  '.svg': 'svg'
}

// Returns the font format for a specific font source
function getFontFormat(src) {
  return Object.keys(formats).reduce((format, extension) => {
    if (src.indexOf(extension) > -1) {
      format = formats[extension]
    }
    return format; // eslint-disable-line
  }, undefined)
}


export default class Font {
  constructor(family, files, properties = { }) {
    this.family = family
    this.files = files
    this.properties = properties
  }

  render() {
    const font = {
      fontFamily: '\'' + this.family + '\'',
      src: this.files.map(src => 'url(\'' + src + '\') format(\'' + getFontFormat(src) + '\')').join(',')
    }

    const fontProperties = [ 'fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange' ]
    Object.keys(this.properties).filter(prop => fontProperties.indexOf(prop) > -1).forEach(fontProp => font[fontProp] = this.properties[fontProp])

    return font
  }
}
