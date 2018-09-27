/* @flow */
import { combineRules } from 'fela'

export default function FelaComponentFactory(
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent(
    { children, as = 'div', style, ...otherProps },
    { renderer }
  ) {
    // TODO: add warning when no style is not provided
    return createElement(FelaTheme, undefined, theme => {
      // TODO: could optimise perf by not calling combineRules if not neccessary
      const className = renderer.renderRule(combineRules(style), {
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
