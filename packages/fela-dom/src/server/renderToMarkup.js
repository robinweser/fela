/* @flow */
import {
  objectReduce,
  clusterCache,
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE
} from 'fela-utils'

import createStyleTagMarkup from './createStyleTagMarkup'
import getRehydrationIndex from './getRehydrationIndex'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

const sheetMap = {
  fontFaces: FONT_TYPE,
  statics: STATIC_TYPE,
  keyframes: KEYFRAME_TYPE,
  rules: RULE_TYPE
}

export default function renderToMarkup(renderer: DOMRenderer): string {
  const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)

  const rehydrationIndex = getRehydrationIndex(renderer)

  const basicMarkup = objectReduce(
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

  return objectReduce(
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
