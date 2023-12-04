import { arrayReduce } from 'fast-loops'
import { clusterCache, cssifySupportRules } from 'fela-utils'

import cssifyMediaQueryRules from './cssifyMediaQueryRules'

export default function renderToString(renderer) {
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
