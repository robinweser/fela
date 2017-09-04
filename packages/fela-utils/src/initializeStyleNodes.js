/* @flow */
import clusterCache from './clusterCache'
import getStyleNode from './getStyleNode'

import { RULE_TYPE, KEYFRAME_TYPE, FONT_TYPE, STATIC_TYPE } from './styleTypes'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

const sheetMap = {
  fontFaces: FONT_TYPE,
  statics: STATIC_TYPE,
  keyframes: KEYFRAME_TYPE,
  rules: RULE_TYPE
}

function initNode(
  styleNodes: Object,
  baseNode: Object,
  css: string,
  type: string,
  media: string = ''
): void {
  const node = getStyleNode(styleNodes, baseNode, type, media)
  // in case that there is a node coming from server already
  // but rules are not matchnig
  if (node.textContent !== css) {
    node.textContent = css
  }
}

export default function initializeStyleNodes(renderer: DOMRenderer): void {
  const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)
  const baseNode = renderer.styleNodes[RULE_TYPE]

  for (const style in sheetMap) {
    if (cacheCluster[style].length > 0) {
      initNode(renderer.styleNodes, baseNode, cacheCluster[style], sheetMap[style])
    }
  }

  for (const media in cacheCluster.mediaRules) {
    const mediaCSS = cacheCluster.mediaRules[media]

    if (mediaCSS.length > 0) {
      initNode(renderer.styleNodes, baseNode, mediaCSS, RULE_TYPE, media)
    }
  }
}
