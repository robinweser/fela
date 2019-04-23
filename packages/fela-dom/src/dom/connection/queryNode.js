/* @flow */
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

export default function queryNode(
  { type, media, support }: NodeAttributes,
  targetDocument: Document,
  id?: string = ''
): ?Object {
  const idQuery = `[data-fela-id="${id}"]`
  const mediaQuery = media ? `[media="${media}"]` : ':not([media])'
  const supportQuery = support
    ? '[data-fela-support="true"]'
    : ':not([data-fela-support="true"])'

  return targetDocument.querySelector(
    `[data-fela-type="${type}"]${idQuery}${supportQuery}${mediaQuery}`
  )
}
