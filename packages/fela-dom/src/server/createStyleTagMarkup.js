/* @flow */
type Type = 'RULE' | 'FONT' | 'KEYFRAME' | 'STATIC'

export default function createStyleMarkup(
  css: string,
  type: Type,
  media: string = '',
  rehydrationIndex: number = -1
): string {
  const mediaAttribute = media.length > 0 ? ` media="${media}"` : ''

  return `<style type="text/css" data-fela-rehydration="${rehydrationIndex}" data-fela-type="${type}"${mediaAttribute}>${css}</style>`
}
