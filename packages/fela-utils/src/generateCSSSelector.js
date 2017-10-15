/* @flow */
export default function generateCSSSelector(
  className: string,
  pseudo: string = ''
): string {
  return `.${className}${pseudo}`
}
