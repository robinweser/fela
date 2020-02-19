/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'
import objectReduce from 'fast-loops/lib/objectReduce'
import {
  clusterCache,
  cssifySupportRules,
  sheetMap,
  RULE_TYPE,
} from 'fela-utils'

import createStyleTagMarkup from './createStyleTagMarkup'
import getRehydrationIndex from './getRehydrationIndex'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

export default function renderToMarkup(renderer: DOMRenderer): string {
  const cacheCluster = clusterCache(renderer.cache, renderer.ruleOrder)

  const rehydrationIndex = getRehydrationIndex(renderer)

  let styleMarkup = objectReduce(
    sheetMap,
    (markup, type, key) => {
      if (cacheCluster[key].length > 0) {
        markup += createStyleTagMarkup(
          cacheCluster[key],
          type,
          '',
          rehydrationIndex,
          false,
          renderer.styleNodeAttributes
        )
      }

      return markup
    },
    ''
  )

  const support = cssifySupportRules(cacheCluster.supportRules)

  if (support) {
    styleMarkup += createStyleTagMarkup(
      support,
      RULE_TYPE,
      '',
      rehydrationIndex,
      true,
      renderer.styleNodeAttributes
    )
  }

  const mediaKeys = Object.keys({
    ...cacheCluster.supportMediaRules,
    ...cacheCluster.mediaRules,
  }).sort(renderer.sortMediaQuery)

  return arrayReduce(
    mediaKeys,
    (markup, media) => {
      // basic media query rules
      if (
        cacheCluster.mediaRules[media] &&
        cacheCluster.mediaRules[media].length > 0
      ) {
        markup += createStyleTagMarkup(
          cacheCluster.mediaRules[media],
          RULE_TYPE,
          media,
          rehydrationIndex,
          false,
          renderer.styleNodeAttributes
        )
      }

      // support media rules
      if (cacheCluster.supportMediaRules[media]) {
        const mediaSupport = cssifySupportRules(
          cacheCluster.supportMediaRules[media]
        )

        if (mediaSupport.length > 0) {
          markup += createStyleTagMarkup(
            mediaSupport,
            RULE_TYPE,
            media,
            rehydrationIndex,
            true,
            renderer.styleNodeAttributes
          )
        }
      }

      return markup
    },
    styleMarkup
  )
}
