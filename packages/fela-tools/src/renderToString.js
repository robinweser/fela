/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'
import {
  clusterCache,
  cssifySupportRules,
  RULE_TYPE,
  KEYFRAME_TYPE,
  STATIC_TYPE,
  FONT_TYPE,
} from 'fela-utils'

import cssifyMediaQueryRules from './cssifyMediaQueryRules'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

export default function renderToString(renderer: DOMRenderer): string {
  const {
    fontFaces,
    statics,
    keyframes,
    rules,
    mediaRules,
    supportRules,
    supportMediaRules,
  } = clusterCache(renderer.cache, renderer.ruleOrder)

  const basicCSS =
    fontFaces + statics + keyframes + rules + cssifySupportRules(supportRules)

  const mediaKeys = Object.keys({
    ...supportMediaRules,
    ...mediaRules,
  }).sort(renderer.sortMediaQuery)

  return arrayReduce(
    mediaKeys,
    (css, query) => {
      const mediaCSS = mediaRules[query] || ''
      const supportCSS = cssifySupportRules(supportMediaRules[query] || {})

      return css + cssifyMediaQueryRules(query, mediaCSS + supportCSS)
    },
    basicCSS
  )
}
