import { generateCSSSelector } from 'fela-utils'

export default function generateCacheEntry(
  type,
  className,
  property,
  value,
  pseudo = '',
  media = '',
  support = '',
  specificityPrefix = ''
) {
  return {
    type,
    className,
    selector: generateCSSSelector(className, pseudo, specificityPrefix),
    declaration: property + ':' + value,
    pseudo,
    media,
    support,
  }
}
