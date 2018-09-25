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

export default function renderToString(renderer: Object): string {
  const {
    fontFaces,
    statics,
    keyframes,
    rules,
    mediaRules,
    supportRules,
    supportMediaRules,
  } = clusterCache(
    renderer.cache,
    renderer.mediaQueryOrder,
    renderer.supportQueryOrder,
    renderer.ruleOrder
  )

  const basicCSS =
    fontFaces + statics + keyframes + rules + cssifySupportRules(supportRules)

  const mediaKeys = Object.keys({
    ...supportMediaRules,
    ...mediaRules,
  })

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
