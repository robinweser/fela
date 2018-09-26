/* @flow */
import { combineRules } from 'fela'

function resolveRule(style, extend) {
  if (extend) {
    const mergedRules = [].concat(style, extend)
    return combineRules(...mergedRules)
  }

  if (Array.isArray(style)) {
    return combineRules(...style)
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
    return createElement(FelaTheme, undefined, theme => {
      const className = renderer.renderRule(resolveRule(style, extend), {
        ...otherProps,
        theme,
      })

      if (children instanceof Function) {
        return children({
          className,
          theme,
          as,
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
