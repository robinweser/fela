/* @flow */
/* eslint-disable consistent-return */
import objectEach from 'fast-loops/lib/objectEach'
import {
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE,
  CLEAR_TYPE,
  generateCSSRule,
} from 'fela-utils'

import getNodeFromCache from './getNodeFromCache'
import insertRule from './insertRule'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'

export default function createSubscription(
  renderer: DOMRenderer,
  targetDocument: any = document
): Function {
  return change => {
    if (change.type === CLEAR_TYPE) {
      objectEach(renderer.nodes, node => node.parentNode.removeChild(node))

      renderer.nodes = {}
      renderer.scoreIndex = {}
      return
    }

    const node = getNodeFromCache(change, renderer, targetDocument)

    switch (change.type) {
      case KEYFRAME_TYPE:
        if (node.textContent.indexOf(change.keyframe) === -1) {
          node.textContent += change.keyframe
        }
        break
      case FONT_TYPE:
        if (node.textContent.indexOf(change.fontFace) === -1) {
          node.textContent += change.fontFace
        }
        break
      case STATIC_TYPE:
        let css = change.selector
          ? generateCSSRule(change.selector, change.css)
          : change.css

        if (node.textContent.indexOf(css) === -1) {
          node.textContent += css
        }
        break
      case RULE_TYPE:
        insertRule(change, renderer, node)
        break
      default:
        // TODO: warning
        break
    }
  }
}
