/* @flow */
export default function getCSSSelector(
  className: string,
  pseudo: string = ''
): string {
  return `.${className}${pseudo}`
}
