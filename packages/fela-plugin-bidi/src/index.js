import transformStyle from 'bidi-css-js'

export default function bidi(direction = 'ltr') {
  function bidiPlugin(style, type, renderer, props) {
    return transformStyle(style, props?.theme?.direction || direction)
  }
}
