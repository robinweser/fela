import { generateCSSSelector } from 'fela-utils'

export default function generateCacheEntry(
  type,
  className,
  property,
  value,
  pseudo = '',
  media = '',
  support = '',
  specificityPrefix = '',
  propertyPriority = 1
) {
  return {
    type,
    className,
    selector: generateCSSSelector(
      className,
      pseudo,
      specificityPrefix,
      propertyPriority
    ),
    declaration: property + ':' + value,
    pseudo,
    media,
    support,
  }
}
