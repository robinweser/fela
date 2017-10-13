/* @flow */
import render from './dom/render'
import rehydrate from './dom/rehydration/rehydrate'

import renderToMarkup from './server/renderToMarkup'
import renderToSheetList from './server/renderToSheetList'

let didWarn = false

function rehydrateCache() {
  if (!didWarn) {
    didWarn = true

    console.warn(
      '[fela-dom] `rehydrateCache` has been renamed to simply `rehydrate`.\n' +
        'Import `rehydrate` directly as it will be removed in version 7.0.0.'
    )
  }

  return rehydrate(...arguments)
}

export { render, rehydrateCache, rehydrate, renderToMarkup, renderToSheetList }
