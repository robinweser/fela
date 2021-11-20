/* @flow */
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

export default function queryNode(
  { type, media, support }: NodeAttributes,
  targetDocument: any = document
): ?Object {
  const mediaQuery = media ? `[media="${media}"]` : ':not([media])'
  const supportQuery = support
    ? '[data-fela-support="true"]'
    : ':not([data-fela-support="true"])'

  return targetDocument.querySelector(
    `[data-fela-type="${type}"]${supportQuery}${mediaQuery}`
  )
}
