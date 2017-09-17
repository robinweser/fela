/* @flow */
import {
  clusterCache,
  objectEach,
  RULE_TYPE,
  STATIC_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE
} from 'fela-utils'

import initDOMNode from './initDOMNode'
import findDOMNodes from './findDOMNodes'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

const sheetMap = {
  fontFaces: FONT_TYPE,
  statics: STATIC_TYPE,
  keyframes: KEYFRAME_TYPE,
  rules: RULE_TYPE
}

export default function connectDOMNodes(renderer: DOMRenderer): void {
  renderer.nodes = findDOMNodes()

  const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)

  const baseNode = renderer.nodes[RULE_TYPE]

  objectEach(sheetMap, (type, key) => {
    if (cacheCluster[key].length > 0) {
      initDOMNode(renderer.nodes, baseNode, cacheCluster[key], type)
    }
  })

  objectEach(cacheCluster.mediaRules, (clusteredCache, media) => {
    if (clusteredCache.length > 0) {
      initDOMNode(renderer.nodes, baseNode, clusteredCache, RULE_TYPE, media)
    }
  })
}
