/* @flow */
export default function generateCSSSelector(
  className: string,
  pseudo: string = '',
  specificityPrefix?: string = '',
  propertyPriority?: number = 1
): string {
  const classNameSelector = `.${className}`.repeat(propertyPriority)

  return `${specificityPrefix}${classNameSelector}${pseudo}`
}
