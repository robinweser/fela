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
  specificityPrefix?: string = ''
): Object {
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
