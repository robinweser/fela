/* @flow weak */
import { RULE_TYPE } from '../utils/styleTypes'

export default function createDOMInterface(renderer, node) {
  return (change) => {
    // only use insertRule in production as browser devtools might have
    // weird behavior if used together with insertRule at runtime
    if (process.env.NODE_ENV === 'production' && change.type === RULE_TYPE && !change.media) {
      try {
        node.sheet.insertRule(`${change.selector}{${change.declaration}}`, node.sheet.cssRules.length)
      } catch (error) {
        // TODO: MAYBE WARN IN DEV MODE
      }
    } else {
      node.textContent = renderer.renderToString()
    }
  }
}
