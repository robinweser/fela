/* @flow weak */
import { RULE_TYPE } from '../utils/styleTypes'

export default function createDOMInterface(renderer, node) {
  return (change) => {
    // only use insertRule in production as browser devtools might have
    // weird behavior if used together with insertRule at runtime
    if (process.env.NODE_ENV === 'production' && change.type === RULE_TYPE && !change.media) {
      node.sheet.insertRule(
        `${change.selector}{${change.declaration}}`,
        node.sheet.cssRules.length
      )
    } else {
      node.textContent = renderer.renderToString()
    }
  }
}
