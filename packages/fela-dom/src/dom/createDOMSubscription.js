/* @flow */
/* eslint-disable consistent-return */
import {
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE,
  CLEAR_TYPE,
  generateCSSRule,
  objectEach
} from 'fela-utils'

import getDOMNode from './getDOMNode'

const changeHandlers = {
  [RULE_TYPE]: (node, { selector, declaration, support }) => {
    const cssRule = generateCSSRule(selector, declaration, support)

    // only use insertRule in production as browser devtools might have
    // weird behavior if used together with insertRule at runtime
    if (process.env.NODE_ENV !== 'production') {
      node.textContent += cssRule
      return
    }

    try {
      node.sheet.insertRule(cssRule, node.sheet.cssRules.length)
    } catch (e) {
      // TODO: warning?
    }
  },
  [KEYFRAME_TYPE]: (node, { keyframe }) => {
    node.textContent += keyframe
  },
  [FONT_TYPE]: (node, { fontFace }) => {
    node.textContent += fontFace
  },
  [STATIC_TYPE]: (node, { selector, css }) => {
    if (selector) {
      node.textContent += generateCSSRule(selector, css)
    } else {
      node.textContent += css
    }
  }
}

export default function createDOMSubscription(nodes: Object): Function {
  const baseNode = nodes[RULE_TYPE]

  return function changeSubscription(change) {
    if (change.type === CLEAR_TYPE) {
      return objectEach(nodes, node => {
        node.textContent = ''
      })
    }

    const handleChange = changeHandlers[change.type]

    if (handleChange) {
      const node = getDOMNode(nodes, baseNode, change.type, change.media)
      handleChange(node, change)
    }
  }
}
