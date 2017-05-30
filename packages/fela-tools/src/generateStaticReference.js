/* @flow */
export default function generateStaticReference(
  style: string | Object,
  selector?: string
): string {
  if (typeof style === 'string') {
    return style
  }

  if (selector) {
    return selector + JSON.stringify(style)
  }

  return ''
}
