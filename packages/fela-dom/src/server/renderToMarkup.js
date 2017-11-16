/* @flow */
import reduce from 'lodash/reduce'

import { clusterCache, sheetMap, RULE_TYPE } from 'fela-utils'

import createStyleTagMarkup from './createStyleTagMarkup'
import getRehydrationIndex from './getRehydrationIndex'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

function renderSupportRules(supportRules: Object): string {
  return reduce(
    supportRules,
    (output, css) => {
      if (css.length > 0) {
        output += css
      }

      return output
    },
    ''
  )
}

export default function renderToMarkup(renderer: DOMRenderer): string {
  const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)

  const rehydrationIndex = getRehydrationIndex(renderer)

  let styleMarkup = reduce(
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

  const support = renderSupportRules(cacheCluster.supportRules)

  if (support) {
    styleMarkup += createStyleTagMarkup(
      support,
      RULE_TYPE,
      '',
      rehydrationIndex,
      true
    )
  }

  const mediaKeys = Object.keys({
    ...cacheCluster.supportMediaRules,
    ...cacheCluster.mediaRules,
  })

  return reduce(
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
          rehydrationIndex
        )
      }

      // support media rules
      if (cacheCluster.supportMediaRules[media]) {
        const mediaSupport = renderSupportRules(
          cacheCluster.supportMediaRules[media]
        )

        if (mediaSupport.length > 0) {
          markup += createStyleTagMarkup(
            mediaSupport,
            RULE_TYPE,
            media,
            rehydrationIndex,
            true
          )
        }
      }

      return markup
    },
    styleMarkup
  )
}
