/* @flow */
import applyMediaRulesInOrder from './applyMediaRulesInOrder'
import generateCSSRule from './generateCSSRule'
import objectReduce from './objectReduce'

import { RULE_TYPE, KEYFRAME_TYPE, FONT_TYPE, STATIC_TYPE } from './styleTypes'

const handlers = {
  [RULE_TYPE]: (cluster, { selector, declaration, support, media }) => {
    const cssRule = generateCSSRule(selector, declaration, support)

    if (media) {
      if (!cluster.mediaRules[media]) {
        cluster.mediaRules[media] = ''
      }

      cluster.mediaRules[media] += cssRule
    } else {
      cluster.rules += cssRule
    }
  },
  [FONT_TYPE]: (cluster, { fontFace }) => {
    cluster.fontFaces += fontFace
  },
  [KEYFRAME_TYPE]: (cluster, { keyframe }) => {
    cluster.keyframes += keyframe
  },
  [STATIC_TYPE]: (cluster, { css, selector }) => {
    if (selector) {
      cluster.statics += generateCSSRule(selector, css)
    } else {
      cluster.statics += css
    }
  }
}

export default function clusterCache(
  cache: Object,
  mediaQueryOrder: Array<string> = []
) {
  const mediaRules = applyMediaRulesInOrder(mediaQueryOrder)

  return objectReduce(
    cache,
    (cluster, entry, key) => {
      const handler = handlers[entry.type]

      if (handler) {
        handler(cluster, entry)
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
