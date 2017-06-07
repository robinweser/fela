/* @flow */
import {
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE,
  CLEAR_TYPE,
  reflushStyleNodes,
  getStyleNode
} from 'fela-utils'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

const sheetMap = {
  [FONT_TYPE]: 'fontFaces',
  [STATIC_TYPE]: 'statics',
  [KEYFRAME_TYPE]: 'keyframes'
}

export default function createDOMInterface(renderer: DOMRenderer): Function {
  renderer.styleNodes = reflushStyleNodes()
  const baseNode = renderer.styleNodes[RULE_TYPE]

  return function changeSubscription(change) {
    if (change.type === CLEAR_TYPE) {
      for (const node in renderer.styleNodes) {
        renderer.styleNodes[node].textContent = ''
      }

      return
    }

    const styleNode = getStyleNode(
      renderer.styleNodes,
      baseNode,
      change.type,
      change.media
    )

    if (change.type === RULE_TYPE) {
      // only use insertRule in production as browser devtools might have
      // weird behavior if used together with insertRule at runtime
      if (process.env.NODE_ENV !== 'production') {
        if (change.media) {
          styleNode.textContent = renderer.mediaRules[change.media]
        } else {
          styleNode.textContent = renderer.rules
        }
      } else {
        try {
          styleNode.sheet.insertRule(
            `${change.selector}{${change.declaration}}`,
            styleNode.sheet.cssRules.length
          )
        } catch (error) {
          // TODO: maybe warn in dev?
        }
      }
    } else {
      styleNode.textContent = renderer[sheetMap[change.type]]
    }
  }
}
