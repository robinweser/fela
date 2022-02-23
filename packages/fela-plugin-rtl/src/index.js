import transformStyle from 'rtl-css-js'

export default function rtl(defaultDirection = 'rtl') {
  return function rtlPlugin(style, type, renderer, props) {
    const direction = props?.theme?.direction || defaultDirection

    if (direction === 'rtl') {
      return transformStyle(style)
    }

    return style
  }
}
