/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'
import objectReduce from 'fast-loops/lib/objectReduce'
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
  support?: boolean,
  rehydration: number,
}

export default function renderToSheetList(renderer: DOMRenderer): Array<Sheet> {
  const cacheCluster = clusterCache(
    renderer.cache,
    renderer.mediaQueryOrder,
    renderer.supportQueryOrder,
    renderer.ruleOrder
  )

  const rehydrationIndex = getRehydrationIndex(renderer)

  const sheetList = objectReduce(
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

  const support = cssifySupportRules(cacheCluster.supportRules)

  if (support) {
    sheetList.push({
      css: support,
      type: RULE_TYPE,
      rehydration: rehydrationIndex,
      support: true,
    })
  }

  const mediaKeys = Object.keys({
    ...cacheCluster.supportMediaRules,
    ...cacheCluster.mediaRules,
  })

  return arrayReduce(
    mediaKeys,
    (list, media) => {
      // basic media query rules
      if (
        cacheCluster.mediaRules[media] &&
        cacheCluster.mediaRules[media].length > 0
      ) {
        list.push({
          css: cacheCluster.mediaRules[media],
          type: RULE_TYPE,
          rehydration: rehydrationIndex,
          media,
        })
      }

      // support media rules
      if (cacheCluster.supportMediaRules[media]) {
        const mediaSupport = cssifySupportRules(
          cacheCluster.supportMediaRules[media]
        )

        if (mediaSupport.length > 0) {
          list.push({
            css: mediaSupport,
            type: RULE_TYPE,
            rehydration: rehydrationIndex,
            support: true,
            media,
          })
        }
      }

      return list
    },
    sheetList
  )
}
