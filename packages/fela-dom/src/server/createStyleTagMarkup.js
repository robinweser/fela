/* @flow */
import type { StyleType } from '../../../../flowtypes/StyleType'

export default function createStyleMarkup(
  css: string,
  type: StyleType,
  media: string = '',
  support: boolean = false
): string {
  const mediaAttribute = media.length > 0 ? ` media="${media}"` : ''
  const supportAttribute = support ? ' data-fela-support="true"' : ''

  return `<style type="text/css" data-fela-type="${type}"${supportAttribute}${mediaAttribute}>${css}</style>`
}
