/* @flow */
import reduce from 'lodash/reduce'
import {
  getRehydrationIndex,
  clusterCache,
  sheetMap,
  RULE_TYPE
} from 'fela-utils'

import createStyleTagMarkup from './createStyleTagMarkup'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

export default function renderToMarkup(renderer: DOMRenderer): string {
  const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)

  const rehydrationIndex = getRehydrationIndex(renderer)

  const basicMarkup = reduce(
    sheetMap,
    (markup, type, key) => {
      if (cacheCluster[key].length > 0) {
        markup += createStyleTagMarkup(
          cacheCluster[key],
          type,
          '',
          rehydrationIndex
        )
      }

      return markup
    },
    ''
  )

  return reduce(
    cacheCluster.mediaRules,
    (markup, css, media) => {
      if (css.length > 0) {
        markup += createStyleTagMarkup(css, RULE_TYPE, media, rehydrationIndex)
      }

      return markup
    },
    basicMarkup
  )
}
