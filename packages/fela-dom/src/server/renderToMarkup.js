/* @flow */
import {
  createStyleTagMarkup,
  clusterCache,
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE
} from 'fela-utils'

const sheetMap = {
  fontFaces: FONT_TYPE,
  statics: STATIC_TYPE,
  keyframes: KEYFRAME_TYPE,
  rules: RULE_TYPE
}

export default function renderToMarkup(renderer: Object): string {
  const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)

  let markup = ''

  for (const style in sheetMap) {
    if (cacheCluster[style].length > 0) {
      markup += createStyleTagMarkup(cacheCluster[style], sheetMap[style])
    }
  }

  for (const media in cacheCluster.mediaRules) {
    const mediaCSS = cacheCluster.mediaRules[media]

    if (mediaCSS.length > 0) {
      markup += createStyleTagMarkup(mediaCSS, RULE_TYPE, media)
    }
  }

  return markup
}
