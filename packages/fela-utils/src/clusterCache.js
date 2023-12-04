import { objectReduce } from 'fast-loops'

import generateCSSRule from './generateCSSRule'
import objectSortByScore from './objectSortByScore'
import getRuleScore from './getRuleScore'

import { RULE_TYPE, KEYFRAME_TYPE, FONT_TYPE, STATIC_TYPE } from './styleTypes'

const handlers = {
  [RULE_TYPE]: (cluster, { selector, declaration, support, media }) => {
    const cssRule = generateCSSRule(selector, declaration)

    if (support) {
      if (media) {
        if (!cluster.supportMediaRules[media]) {
          cluster.supportMediaRules[media] = {}
        }

        if (!cluster.supportMediaRules[media][support]) {
          cluster.supportMediaRules[media][support] = ''
        }

        cluster.supportMediaRules[media][support] += cssRule
      } else {
        if (!cluster.supportRules[support]) {
          cluster.supportRules[support] = ''
        }

        cluster.supportRules[support] += cssRule
      }
    } else if (media) {
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
  },
}

export default function clusterCache(cache, ruleOrder = []) {
  const sortedCache = objectSortByScore(cache, (value) =>
    getRuleScore(ruleOrder, value.pseudo)
  )

  return objectReduce(
    sortedCache,
    (cluster, entry) => {
      const handler = handlers[entry.type]

      if (handler) {
        handler(cluster, entry)
      }

      return cluster
    },
    {
      mediaRules: {},
      supportRules: {},
      supportMediaRules: {},
      fontFaces: '',
      statics: '',
      keyframes: '',
      rules: '',
    }
  )
}
