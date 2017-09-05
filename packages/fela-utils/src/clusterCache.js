/* @flow */
import applyMediaRulesInOrder from './applyMediaRulesInOrder'
import generateCSSRule from './generateCSSRule'
import objectReduce from './objectReduce'

import { RULE_TYPE, KEYFRAME_TYPE, FONT_TYPE, STATIC_TYPE } from './styleTypes'

export default function clusterCache(
  cache: Object,
  mediaQueryOrder: Array<string> = []
) {
  const mediaRules = applyMediaRulesInOrder(mediaQueryOrder)

  return objectReduce(
    cache,
    (cluster, entry, key) => {
      // rules
      if (entry.type === RULE_TYPE) {
        const cssRule = generateCSSRule(entry.selector, entry.declaration)

        if (entry.media) {
          if (!cluster.mediaRules[entry.media]) {
            cluster.mediaRules[entry.media] = ''
          }

          cluster.mediaRules[entry.media] += cssRule
        } else {
          cluster.rules += cssRule
        }
      }

      // font faces
      if (entry.type === FONT_TYPE) {
        cluster.fontFaces += entry.fontFace
      }

      // keyframes
      if (entry.type === KEYFRAME_TYPE) {
        cluster.keyframes += entry.keyframe
      }

      // static
      if (entry.type === STATIC_TYPE) {
        if (entry.selector) {
          cluster.statics += generateCSSRule(entry.selector, entry.css)
        } else {
          cluster.statics += entry.css
        }
      }

      return cluster
    },
    {
      mediaRules,
      fontFaces: '',
      statics: '',
      keyframes: '',
      rules: ''
    }
  )
}
