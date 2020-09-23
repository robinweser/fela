/* @flow */
import { generateCSSSelector } from 'fela-utils'

import type { StyleType } from '../../../../../flowtypes/StyleType'

export default function generateCacheEntry(
  type: StyleType,
  className: string,
  property: string,
  value: any,
  pseudo?: string = '',
  media?: string = '',
  support?: string = '',
  specifityPrefix?: string = ''
): Object {
  return {
    type,
    className,
    selector: generateCSSSelector(className, pseudo, specifityPrefix),
    declaration: property + ':' + value,
    pseudo,
    media,
    support,
  }
}
