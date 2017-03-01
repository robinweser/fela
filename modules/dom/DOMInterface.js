/* @flow weak */
import { RULE_TYPE, KEYFRAME_TYPE, FONT_TYPE, STATIC_TYPE, CLEAR_TYPE } from '../utils/styleTypes'

const styleNodes = {}

export default function createDOMInterface(renderer, node) {
  // TODO: only use multiple sheets in prod
  styleNodes[''] = node

  createStyleNode(FONT_TYPE)
  createStyleNode(STATIC_TYPE)
  createStyleNode(KEYFRAME_TYPE)

  if (renderer.mediaQueryOrder) {
    for (let i = 0, len = renderer.mediaQueryOrder.length; i < len; ++i) {
      createStyleNode(RULE_TYPE, renderer.mediaQueryOrder[i])
    }
  }

  return (change) => {
    // only use insertRule in production as browser devtools might have
    // weird behavior if used together with insertRule at runtime
    if (change.type === CLEAR_TYPE) {
      for (node in styleNodes) {
        styleNodes[node].textContent = ''
      }
    } else {
      const styleNode = getStyleNode(change.type, change.media)

      if (process.env.NODE_ENV === 'production' && change.type === RULE_TYPE) {
        try {
          styleNode.sheet.insertRule(`${change.selector}{${change.declaration}}`, styleNode.sheet.cssRules.length)
        } catch (error) {
          // TODO: MAYBE WARN IN DEV MODE
        }
      } else {
        // TODO: only add newly renderer stuff
        styleNode.textContent = renderer.renderToString()
      }
    }
  }
}

function createStyleNode(type, media = '') {
  const node = document.createElement('style')
  node.setAttribute(`data-fela-stylesheet-${type}`, '')
  node.type = 'text/css'

  styleNodes[type + media] = node

  if (media.length > 0) {
    node.media = media
    document.head.appendChild(node)
  } else {
    document.head.insertBefore(node, styleNodes[''])
  }
}

function getStyleNode(type, media = '') {
  const key = type + media

  if (!styleNodes[key]) {
    createStyleNode(type, media)
  }

  return styleNodes[key]
}
