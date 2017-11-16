/* @flow */
type Type = 'RULE' | 'FONT' | 'KEYFRAME' | 'STATIC'

export default function createStyleMarkup(
  css: string,
  type: Type,
  media: string = '',
  rehydrationIndex: number = -1,
  support: boolean = false
): string {
  const mediaAttribute = media.length > 0 ? ` media="${media}"` : ''
  const supportAttribute = support ? ` data-fela-support="true"` : ''

  return `<style type="text/css" data-fela-rehydration="${rehydrationIndex}" data-fela-type="${type}"${supportAttribute}${mediaAttribute}>${css}</style>`
}
