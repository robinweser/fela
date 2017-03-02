/* @flow weak */
import { RULE_TYPE, KEYFRAME_TYPE, FONT_TYPE, STATIC_TYPE, CLEAR_TYPE } from '../utils/styleTypes'

const cacheMap = {
  [STATIC_TYPE]: 'statics',
  [FONT_TYPE]: 'fontFaces',
  [KEYFRAME_TYPE]: 'keyframes'
}

const styleNodes = {}

export default function createDOMInterface(renderer, node) {
  // only use insertRule in production as browser devtools might have
  // weird behavior if used together with insertRule at runtime
  if (process.env.NODE_ENV !== 'production') {
    return () => {
      node.textContent = renderer.renderToString()
    }
  }

  styleNodes[''] = node

  if (renderer.mediaQueryOrder) {
    for (let i = 0, len = renderer.mediaQueryOrder.length; i < len; ++i) {
      createStyleNode(RULE_TYPE, renderer.mediaQueryOrder[i])
    }
  }

  reflushNodes(renderer)

  return (change) => {
    if (change.type === CLEAR_TYPE) {
      for (node in styleNodes) {
        styleNodes[node].textContent = ''
      }
    } else {
      const styleNode = getStyleNode(change.type, change.media)

      if (change.type === RULE_TYPE) {
        try {
          styleNode.sheet.insertRule(`${change.selector}{${change.declaration}}`, styleNode.sheet.cssRules.length)
        } catch (error) {
          // TODO: MAYBE WARN IN DEV MODE
        }
      } else {
        styleNode.textContent = renderer[cacheMap[change.type]]
      }
    }
  }
}

function reflushNodes(renderer) {
  for (const type in cacheMap) {
    const css = renderer[cacheMap[type]]
    if (css) {
      const node = getStyleNode(type)
      node.textContent = css
    }
  }

  if (renderer.rules) {
    styleNodes[''].textContent = renderer.rules
  }

  for (const mediaQuery in renderer.mediaRules) {
    const mediaRuleNode = getStyleNode(RULE_TYPE, mediaQuery)
    mediaRuleNode.textContent = renderer.mediaRules[mediaQuery]
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
