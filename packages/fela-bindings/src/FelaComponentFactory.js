/* @flow */
import { combineRules } from 'fela'

function resolveRule(style, extend) {
  if (extend) {
    return combineRules(style, extend)
  }

  if (typeof style === 'object') {
    return () => style
  }

  return style
}

export default function FelaComponentFactory(
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent(
    { children, as = 'div', style, extend, ...otherProps },
    { renderer }
  ) {
    // TODO: add warning when no style is not provided
    // TODO: add tests for multiple nested components
    return createElement(FelaTheme, undefined, theme => {
      const rule = resolveRule(style, extend)

      const className = renderer.renderRule(rule, { theme, ...otherProps })

      if (children instanceof Function) {
        return children({
          className,
          theme,
        })
      }

      return createElement(as, { className }, children)
    })
  }

  if (contextTypes) {
    FelaComponent.contextTypes = contextTypes
  }

  return FelaComponent
}
