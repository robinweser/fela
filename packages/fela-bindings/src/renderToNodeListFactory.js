import { renderToSheetList } from 'fela-dom'

export default function renderToNodeListFactory(createElement) {
  return function renderToNodeList(renderer) {
    const sheetList = renderToSheetList(renderer)

    return sheetList.map(({ type, media, rehydration, support, css }) =>
      createElement('style', {
        key: type + media,
        ...renderer.styleNodeAttributes,
        media,
        'data-fela-rehydration': rehydration,
        'data-fela-type': type,
        'data-fela-support': support,
        dangerouslySetInnerHTML: { __html: css },
      })
    )
  }
}
