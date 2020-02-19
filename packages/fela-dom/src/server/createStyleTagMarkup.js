/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import type { StyleType } from '../../../../flowtypes/StyleType'

export default function createStyleTagMarkup(
  css: string,
  type: StyleType,
  media: string = '',
  rehydrationIndex: number = -1,
  support: boolean = false,
  styleNodeAttributes: Object = {}
): string {
  const mediaAttribute = media.length > 0 ? ` media="${media}"` : ''
  const supportAttribute = support ? ' data-fela-support="true"' : ''
  const userAttributes = objectReduce(
    styleNodeAttributes,
    (attributes, value, attribute) =>
      attributes + ' ' + attribute + '="' + value + '"',
    ''
  )

  return `<style type="text/css" data-fela-rehydration="${rehydrationIndex}" data-fela-type="${type}"${supportAttribute}${mediaAttribute}${userAttributes}>${css}</style>`
}
