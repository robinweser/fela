/* @flow */
import resolveRule from './resolveRule'

export default function FelaComponentFactory(
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent(
    { render = 'div', style, rule, children, ...restProps },
    { renderer }
  ) {
    return createElement(FelaTheme, {
      render: theme => {
        const props = rule ? { theme, ...restProps } : theme

        const className = renderer._renderStyle(
          resolveRule(rule || style, props, renderer),
          props
        )

        if (render instanceof Function) {
          return render({
            className,
            theme,
          })
        }

        return createElement(render, { className }, children)
      },
    })
  }

  if (contextTypes) {
    FelaComponent.contextTypes = contextTypes
  }

  return FelaComponent
}
