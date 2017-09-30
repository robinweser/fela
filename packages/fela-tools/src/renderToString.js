/* @flow */
import {
  cssifyMediaQueryRules,
  objectReduce,
  clusterCache,
  RULE_TYPE,
  KEYFRAME_TYPE,
  STATIC_TYPE,
  FONT_TYPE
} from 'fela-utils'

export default function renderToString(renderer: Object): string {
  const { fontFaces, statics, keyframes, rules, mediaRules } = clusterCache(
    renderer.cache,
    renderer.mediaQueryOrder
  )

  const basicCSS = fontFaces + statics + keyframes + rules

  return objectReduce(
    mediaRules,
    (css, rules, query) => css + cssifyMediaQueryRules(query, rules),
    basicCSS
  )
}
