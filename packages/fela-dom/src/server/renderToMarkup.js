/* @flow */
import {
  createStyleTagMarkup,
  objectReduce,
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

  const basicMarkup = objectReduce(
    sheetMap,
    (markup, type, key) => {
      if (cacheCluster[key].length > 0) {
        markup += createStyleTagMarkup(cacheCluster[key], type)
      }

      return markup
    },
    ''
  )

  return objectReduce(
    cacheCluster.mediaRules,
    (markup, css, media) => {
      if (css.length > 0) {
        markup += createStyleTagMarkup(css, RULE_TYPE, media)
      }

      return markup
    },
    basicMarkup
  )
}
