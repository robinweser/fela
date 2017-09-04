/* @flow */
import {
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE,
  CLEAR_TYPE,
  generateCSSRule,
  reflushStyleNodes,
  initializeStyleNodes,
  getStyleNode
} from 'fela-utils'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

export default function createDOMInterface(renderer: DOMRenderer): Function {
  renderer.styleNodes = reflushStyleNodes(renderer)
  initializeStyleNodes(renderer)

  const baseNode = renderer.styleNodes[RULE_TYPE]

  return function changeSubscription(change) {
    if (change.type === CLEAR_TYPE) {
      for (const node in renderer.styleNodes) {
        renderer.styleNodes[node].textContent = ''
      }

      return
    }

    const styleNode = getStyleNode(renderer.styleNodes, baseNode, change.type, change.media)

    if (change.type === RULE_TYPE) {
      const cssRule = generateCSSRule(change.selector, change.declaration)

      // only use insertRule in production as browser devtools might have
      // weird behavior if used together with insertRule at runtime
      if (process.env.NODE_ENV !== 'production') {
        styleNode.textContent += cssRule
      } else {
        try {
          styleNode.sheet.insertRule(cssRule, styleNode.sheet.cssRules.length)
        } catch (e) {}
      }
    }

    if (change.type === FONT_TYPE) {
      styleNode.textContent += change.fontFace
    }

    if (entry.type === KEYFRAME_TYPE) {
      styleNode.textContent += change.keyframe
    }

    if (entry.TYPE === STATIC_TYPE) {
      if (entry.selector) {
        styleNode.textContent += generateCSSRule(change.selector, change.css)
      } else {
        styleNode.textContent += change.css
      }
    }
  }
}
