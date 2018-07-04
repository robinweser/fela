/* @flow */
/* eslint-disable consistent-return */
import objectEach from 'fast-loops/lib/objectEach'
import {
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE,
  CLEAR_TYPE,
  getRuleScore,
  generateCSSRule,
} from 'fela-utils'

import getNodeFromCache from './getNodeFromCache'
import generateRule from './generateRule'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'

export default function createSubscription(renderer: DOMRenderer): Function {
  return change => {
    if (change.type === CLEAR_TYPE) {
      objectEach(renderer.nodes, ({ node }) =>
        node.parentNode.removeChild(node)
      )

      renderer.nodes = {}
      return
    }

    const node = getNodeFromCache(change, renderer)

    switch (change.type) {
      case KEYFRAME_TYPE:
        node.textContent += change.keyframe
      case FONT_TYPE:
        node.textContent += change.fontFace
      case STATIC_TYPE:
        node.textContent += change.selector
          ? generateCSSRule(change.selector, change.css)
          : change.css
      case RULE_TYPE:
        insertRule(change, renderer, node)
    }
  }
}
