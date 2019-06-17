/* @flow */
import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'
import type { DOMRendererDocumentRef } from '../../../../../flowtypes/DOMRenderer'

export default function queryNode(
  { type, media, support }: NodeAttributes,
  documentRef: DOMRendererDocumentRef
): ?Object {
  const mediaQuery = media ? `[media="${media}"]` : ':not([media])'
  const supportQuery = support
    ? '[data-fela-support="true"]'
    : ':not([data-fela-support="true"])'

  return documentRef.target.querySelector(
    `[data-fela-type="${type}"]${supportQuery}${mediaQuery}`
  )
}
