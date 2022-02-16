export default function generateCSSSelector(
  className,
  pseudo = '',
  specificityPrefix = '',
  propertyPriority = 1
) {
  const classNameSelector = `.${className}`.repeat(propertyPriority)

  return `${specificityPrefix}${classNameSelector}${pseudo}`
}
