/* @flow */
import {
  clusterCache,
  objectReduce,
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
type Sheet = {
  css: string,
  type: RULE_TYPE | KEYFRAME_TYPE | FONT_TYPE | STATIC_TYPE,
  media?: string
}

export default function renderToSheetList(renderer: Object): Array<Sheet> {
  const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)

  const sheetList = objectReduce(
    sheetMap,
    (list, type, key) => {
      if (cacheCluster[key].length > 0) {
        list.push({
          css: cacheCluster[key],
          type
        })
      }

      return list
    },
    []
  )

  return objectReduce(
    cacheCluster.mediaRules,
    (list, css, media) => {
      if (css.length > 0) {
        list.push({
          css,
          type: RULE_TYPE,
          media
        })
      }

      return list
    },
    sheetList
  )
}
