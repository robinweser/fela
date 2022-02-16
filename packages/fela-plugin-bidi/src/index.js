import transformStyle from 'bidi-css-js'

export default function bidi(flowDirection = 'ltr') {
  return (style, type, renderer, props) =>
    transformStyle(
      style,
      (props && props.theme && props.theme.direction) || flowDirection
    )
}
