/* @flow */
import { RULE_TYPE } from 'fela-utils'

import renderToSheetList from '../../server/renderToSheetList'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'

// This method is quite hacky and in-performant, but yet
// the most simple way to respect rule sorting even in devMode
export default function updateNodeInDevMode(
  renderer: DOMRenderer,
  node: Object
): void {
  const sheetList = renderToSheetList(renderer)

  const media = node.getAttribute('media') || undefined
  const support = node.getAttribute('data-fela-support') || undefined

  const sheet = sheetList.find(
    currentSheet =>
      currentSheet.type === RULE_TYPE &&
      currentSheet.media === media &&
      currentSheet.support === support
  )

  if (sheet) {
    node.textContent = sheet.css
  }
}
