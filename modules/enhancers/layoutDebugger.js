/* @flow weak */
function addLayoutDebugger(renderer, options) {
  const existingRenderRule = renderer.renderRule.bind(renderer)

  renderer.renderRule = (rule, props) => {
    const className = existingRenderRule(rule, props)

    const ruleName = rule.name || 'debug_layout'
    const color = (ruleName + ruleName).length * 17 * ruleName.length

    const debugLayoutClassName = `fela-debug-layout_${ruleName}`

    if (options.backgroundColor) {
      renderer.renderStatic(
        { backgroundColor: `hsla(${color}, 100%, 25%, 0.1) !important` },
        `.${debugLayoutClassName}`
      )
    } else {
      renderer.renderStatic(
        { outline: `${options.thickness}px solid hsl(${color}, 100%, 50%) !important` },
        `.${debugLayoutClassName}`
      )
    }

    return `${debugLayoutClassName} ${className}`
  }

  return renderer
}

const defaultOptions = {
  backgroundColor: false,
  thickness: 1
}
export default options => renderer => addLayoutDebugger(renderer, {
  ...defaultOptions,
  ...options
})
