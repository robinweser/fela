/* @flow */
import objectEach from 'fast-loops/lib/objectEach'
import arrayEach from 'fast-loops/lib/arrayEach'

import {
  clusterCache,
  cssifySupportRules,
  sheetMap,
  RULE_TYPE,
} from 'fela-utils'

import initDOMNode from './initDOMNode'
import findDOMNodes from './findDOMNodes'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

export default function connectDOMNodes(renderer: DOMRenderer): void {
  renderer.nodes = findDOMNodes()

  const cacheCluster = clusterCache(
    renderer.cache,
    renderer.mediaQueryOrder,
    renderer.supportQueryOrder
  )

  const baseNode = renderer.nodes[RULE_TYPE]

  objectEach(sheetMap, (type, key) => {
    if (cacheCluster[key].length > 0) {
      initDOMNode(renderer.nodes, baseNode, cacheCluster[key], type)
    }
  })

  const support = cssifySupportRules(cacheCluster.supportRules)

  if (support) {
    initDOMNode(renderer.nodes, baseNode, support, RULE_TYPE, '', true)
  }

  const mediaKeys = Object.keys({
    ...cacheCluster.supportMediaRules,
    ...cacheCluster.mediaRules,
  })

  arrayEach(mediaKeys, media => {
    if (
      cacheCluster.mediaRules[media] &&
      cacheCluster.mediaRules[media].length > 0
    ) {
      initDOMNode(
        renderer.nodes,
        baseNode,
        cacheCluster.mediaRules[media],
        RULE_TYPE,
        media
      )
    }

    if (cacheCluster.supportMediaRules[media]) {
      const mediaSupport = cssifySupportRules(
        cacheCluster.supportMediaRules[media]
      )

      if (mediaSupport.length > 0) {
        initDOMNode(
          renderer.nodes,
          baseNode,
          mediaSupport,
          RULE_TYPE,
          media,
          true
        )
      }
    }
  })
}
