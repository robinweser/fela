/* @flow */
type Type = 'RULE' | 'FONT' | 'KEYFRAME' | 'STATIC'

export default function createStyleMarkup(
  css: string,
  type: Type,
  media: string = ''
): string {
  const mediaAttribute = media.length > 0 ? ` media="${media}"` : ''

  return `<style type="text/css" data-fela-type="${type}"${mediaAttribute}>${css}</style>`
}
