/* @flow */
import {
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE,
  CLEAR_TYPE
} from '../utils/styleTypes'

function reflushStyleNodes() {
  const styleNodes = {}

  const styleElements = document.querySelectorAll('[data-fela-type]')

  for (let i = 0, len = styleElements.length; i < len; ++i) {
    const element = styleElements[i]

    const type = element.getAttribute('data-fela-type') || ''
    const media = element.getAttribute('media') || ''

    styleNodes[type + media] = element
  }

  return styleNodes
}

function createStyleNode(type, media = '') {
  const node = document.createElement('style')
  node.setAttribute('data-fela-type', type)
  node.type = 'text/css'

  if (media.length > 0) {
    node.media = media
    document.head.appendChild(node)
  } else {
    document.head.insertBefore(node, styleNodes[''])
  }

  return node
}

export default function createDOMInterface(renderer) {
  const styleNodes = reflushStyleNodes()

  function getStyleNode(type, media = '') {
    const key = type + media

    if (!styleNodes[key]) {
      styleNodes[key] = createStyleNode(type, media)
    }

    return styleNodes[key]
  }
  const sheetMap = {
    [FONT_TYPE]: 'fontFaces',
    [STATIC_TYPE]: 'statics',
    [KEYFRAME_TYPE]: 'keyframes'
  }

  return (change) => {
    if (change.type === CLEAR_TYPE) {
      for (node in styleNodes) {
        styleNodes[node].textContent = ''
      }
    } else {
      const styleNode = getStyleNode(change.type, change.media)

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
            // TODO: MAYBE WARN IN DEV MODE
          }
        }
      } else {
        styleNode.textContent = renderer[sheetMap[change.type]]
      }
    }
  }
}
