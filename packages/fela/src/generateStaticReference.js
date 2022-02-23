export default function generateStaticReference(style, selector) {
  if (typeof style === 'string') {
    return style
  }

  if (selector) {
    return selector + JSON.stringify(style)
  }

  return ''
}
