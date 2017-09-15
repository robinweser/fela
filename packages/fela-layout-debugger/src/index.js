/* @flow */
import { JavascriptStylesDebugger as createStyleDebugger } from 'styles-debugger'
import { combineRules } from 'fela'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

function addLayoutDebugger(
  renderer: DOMRenderer,
  options: Object
): DOMRenderer {
  const layoutDebugger = createStyleDebugger(options)
  const existingRenderRule = renderer.renderRule.bind(renderer)

  renderer.renderRule = (rule: Function, props: Object): string => {
    const displayName = rule.name ? rule.name : 'FelaComponent'

    const combinedRule = combineRules(
      rule,
      () => layoutDebugger(displayName),
      () => ({
        ':after': {
          lineHeight: 1.5
        }
      })
    )
    return existingRenderRule(combinedRule, props)
  }

  return renderer
}

export default function layoutDebugger(options: Object = {}) {
  return (renderer: DOMRenderer) => addLayoutDebugger(renderer, options)
}
