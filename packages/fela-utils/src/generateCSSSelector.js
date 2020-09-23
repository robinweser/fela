/* @flow */
export default function generateCSSSelector(
  className: string,
  pseudo: string = '',
  specificityPrefix?: string = ''
): string {
  return `${specificityPrefix}.${className}${pseudo}`
}
