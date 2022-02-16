import { arrayReduce, objectReduce } from 'fast-loops'
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

export default function renderToSheetList(renderer) {
  const cacheCluster = clusterCache(renderer.cache, renderer.ruleOrder)

  const rehydrationIndex = getRehydrationIndex(renderer)

  const sheetList = objectReduce(
    sheetMap,
    (list, type, key) => {
      if (cacheCluster[key].length > 0) {
        list.push({
          css: cacheCluster[key],
          rehydration: rehydrationIndex,
          attributes: renderer.styleNodeAttributes,
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
      attributes: renderer.styleNodeAttributes,
      support: true,
    })
  }

  const mediaKeys = Object.keys({
    ...cacheCluster.supportMediaRules,
    ...cacheCluster.mediaRules,
  }).sort(renderer.sortMediaQuery)

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
          attributes: renderer.styleNodeAttributes,
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
            attributes: renderer.styleNodeAttributes,
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
