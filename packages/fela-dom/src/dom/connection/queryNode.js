/* @flow */
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

export default function queryNode({
  type,
  media,
  support,
}: NodeAttributes): ?Object {
  const mediaQuery = media ? `[media="${media}"]` : ':not([media])'
  const supportQuery = support
    ? '[data-fela-support="true"]'
    : ':not([support])'

  return document.querySelector(
    `[data-fela-type="${type}"]${supportQuery}${mediaQuery}`
  )
}
