/* @flow weak */
export default function generateStaticReference(style, selector) {
  if (typeof style === 'string') {
    return style
  }

  return selector + JSON.stringify(style)
}
