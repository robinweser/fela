/* @flow */
import type { StyleType } from '../../../../flowtypes/StyleType'

export default function createStyleTagMarkup(
  css: string,
  type: StyleType,
  rendererId: string = '',
  media: string = '',
  rehydrationIndex: number = -1,
  support: boolean = false
): string {
  const idAttribute = ` data-fela-id="${rendererId}"`
  const mediaAttribute = media.length > 0 ? ` media="${media}"` : ''
  const supportAttribute = support ? ' data-fela-support="true"' : ''

  return `<style type="text/css" data-fela-rehydration="${rehydrationIndex}" data-fela-type="${type}"${idAttribute}${supportAttribute}${mediaAttribute}>${css}</style>`
}
