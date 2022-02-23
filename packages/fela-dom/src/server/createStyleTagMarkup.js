import { objectReduce } from 'fast-loops'

export default function createStyleTagMarkup(
  css,
  type,
  media = '',
  rehydrationIndex = -1,
  support = false,
  styleNodeAttributes = {}
) {
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
