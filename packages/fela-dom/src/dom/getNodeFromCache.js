/* @flow */
import { FONT_TYPE, STATIC_TYPE, KEYFRAME_TYPE, RULE_TYPE } from 'fela-utils'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

const typeOrder = [FONT_TYPE, STATIC_TYPE, KEYFRAME_TYPE, RULE_TYPE]

function getNodeScore(
  renderer: DOMRenderer,
  type: string,
  media?: string = '',
  support?: boolean = false
) {
  let score = typeOrder.indexOf(type) * 100

  if (media.length > 0) {
    score += 10

    const mediaIndex = renderer.mediaQueryOrder.indexOf(media)

    if (mediaIndex !== -1) {
      score += mediaIndex * 2
    } else {
      score += renderer.mediaQueryOrder.length * 2
    }
  }

  if (support) {
    score += 1
  }

  return score
}

function getNodeReference(
  type: string,
  media?: string = '',
  support?: boolean = false
) {
  return type + media + support
}

function queryNode(
  type: string,
  media?: string = '',
  support?: boolean = false
) {
  const mediaQuery = media.length > 0 ? `[media="${media}"]` : ''
  const supportQuery = support ? '[data-fela-support="true"]' : ''

  return document.querySelector(
    `[data-fela-type="${type}"]${supportQuery}${mediaQuery}`
  )
}

function getNode(
  renderer: DOMRenderer,
  score: number,
  type: string,
  media?: string = '',
  support?: boolean = false
): Object {
  return (
    queryNode(type, media, support) ||
    createNode(renderer, score, type, media, support)
  )
}

function getDocumentHead(): Object {
  return document.head || {}
}

function createNode(
  renderer: DOMRenderer,
  score: number,
  type: string,
  media?: string = '',
  support?: boolean = false
): Object {
  const head = getDocumentHead()

  const node = document.createElement('style')
  node.setAttribute('data-fela-type', type)
  node.type = 'text/css'

  if (support) {
    node.setAttribute('data-fela-support', 'true')
  }

  if (media.length > 0) {
    node.media = media
  }

  const higherKey = Object.keys(renderer.nodes).find(
    key => renderer.nodes[key].score > score
  )

  if (higherKey) {
    head.insertBefore(node, renderer.nodes[higherKey].node)
  } else {
    head.appendChild(node)
  }

  return node
}

export default function getNodeFromCache(
  renderer: DOMRenderer,
  type: string,
  media?: string = '',
  support?: boolean = false
): Object {
  const reference = getNodeReference(type, media, support)

  if (!renderer.nodes[reference]) {
    const score = getNodeScore(renderer, type, media, support)

    renderer.nodes[reference] = {
      node: getNode(renderer, score, type, media, support),
      score,
    }
  }

  return renderer.nodes[reference].node
}
