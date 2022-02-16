import { JavascriptStylesDebugger as createStyleDebugger } from 'styles-debugger'
import { combineRules } from 'fela'

function addLayoutDebugger(renderer, options) {
  const styleDebugger = createStyleDebugger(options)
  const existingRenderRule = renderer.renderRule.bind(renderer)

  renderer.renderRule = (rule, props) => {
    const displayName = rule.name ? rule.name : 'FelaComponent'

    const combinedRule = combineRules(
      rule,
      () => styleDebugger(displayName),
      () => ({
        ':after': {
          lineHeight: 1.5,
        },
      })
    )
    return existingRenderRule(combinedRule, props)
  }

  return renderer
}

export default function layoutDebugger(options = {}) {
  return (renderer) => addLayoutDebugger(renderer, options)
}
