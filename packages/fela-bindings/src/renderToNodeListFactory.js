/* @flow */
import { renderToSheetList } from 'fela-dom'
import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'

export function renderToNodeListFactory(createElement: Function) {
  return function renderToNodeList(renderer: DOMRenderer) {
    const sheetList = renderToSheetList(renderer)

    return sheetList.map(({ type, media, rehydration, support, css }) =>
      createElement('style', {
        key: type + media,
        media,
        'data-fela-rehydration': rehydration,
        'data-fela-type': type,
        'data-fela-support': support,
        dangerouslySetInnerHTML: { __html: css },
      })
    )
  }
}
