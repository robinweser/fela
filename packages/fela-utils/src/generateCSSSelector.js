/* @flow */
export default function generateCSSSelector(
  className: string,
  pseudo: string = '',
  specifityPrefix?: string = ''
): string {
  return `${specifityPrefix}.${className}${pseudo}`
}
