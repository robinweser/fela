/* @flow */
import reduce from 'lodash/reduce'
import {
  clusterCache,
  cssifySupportRules,
  sheetMap,
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE,
} from 'fela-utils'

import getRehydrationIndex from './getRehydrationIndex'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

type Sheet = {
  css: string,
  type: RULE_TYPE | KEYFRAME_TYPE | FONT_TYPE | STATIC_TYPE,
  media?: string,
}

export default function renderToSheetList(renderer: DOMRenderer): Array<Sheet> {
  const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)

  const rehydrationIndex = getRehydrationIndex(renderer)

  const sheetList = reduce(
    sheetMap,
    (list, type, key) => {
      if (cacheCluster[key].length > 0) {
        list.push({
          css: cacheCluster[key],
          rehydration: rehydrationIndex,
          type,
        })
      }

      return list
    },
    []
  )

  return reduce(
    cacheCluster.mediaRules,
    (list, css, media) => {
      if (css.length > 0) {
        list.push({
          css,
          type: RULE_TYPE,
          rehydration: rehydrationIndex,
          media,
        })
      }

      return list
    },
    sheetList
  )
}
