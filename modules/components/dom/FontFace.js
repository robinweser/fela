import getFontFormat from './utils/getFontFormat'

export default class FontFace {
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
