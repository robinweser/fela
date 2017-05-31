/* @flow */
import type DOMRenderer from '../../../flowtypes/DOMRenderer'

function addLayoutDebugger(
  renderer: DOMRenderer,
  options: Object
): DOMRenderer {
  const existingRenderRule = renderer.renderRule.bind(renderer)

  renderer.renderRule = (rule: Function, props: Object): string => {
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
        {
          outline: `${options.thickness}px solid hsl(${color}, 100%, 50%) !important`
        },
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

export default function layoutDebugger(options: Object = {}) {
  return (renderer: DOMRenderer) =>
    addLayoutDebugger(renderer, {
      ...defaultOptions,
      ...options
    })
}
