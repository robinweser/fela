export default function extractCustomClassName(style) {
  if (style._className) {
    const cls = style._className + ' '
    delete style._className
    return cls
  }

  return ''
}
