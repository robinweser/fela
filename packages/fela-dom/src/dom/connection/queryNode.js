/* @flow */
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

export default function queryNode(
  { type, media, support }: NodeAttributes,
  id?: string = ''
): ?Object {
  const idQuery = id.length > 0 ? `[data-fela-id="${id}"]` : ''
  const mediaQuery = media ? `[media="${media}"]` : ':not([media])'
  const supportQuery = support
    ? '[data-fela-support="true"]'
    : ':not([data-fela-support="true"])'

  return document.querySelector(
    `[data-fela-type="${type}"]${idQuery}${supportQuery}${mediaQuery}`
  )
}
