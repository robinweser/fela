/* @flow */
import forEach from 'lodash/forEach'

import { clusterCache, sheetMap, RULE_TYPE } from 'fela-utils'

import initDOMNode from './initDOMNode'
import findDOMNodes from './findDOMNodes'

import type DOMRenderer from '../../../../flowtypes/DOMRenderer'

export default function connectDOMNodes(renderer: DOMRenderer): void {
  renderer.nodes = findDOMNodes()

  const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)

  const baseNode = renderer.nodes[RULE_TYPE]

  forEach(sheetMap, (type, key) => {
    if (cacheCluster[key].length > 0) {
      initDOMNode(renderer.nodes, baseNode, cacheCluster[key], type)
    }
  })

  forEach(cacheCluster.mediaRules, (clusteredCache, media) => {
    if (clusteredCache.length > 0) {
      initDOMNode(renderer.nodes, baseNode, clusteredCache, RULE_TYPE, media)
    }
  })
}
