/* @flow */
import resolveRule from './resolveRule'

export default function FelaComponentFactory(
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent(
    { children, customClass, render = 'div', rule, style, ...restProps },
    { renderer }
  ) {
    return createElement(FelaTheme, {
      render: theme => {
        const props = rule ? { theme, ...restProps } : theme

        const className = `${
          customClass ? `${customClass} ` : ''
        }${renderer._renderStyle(
          resolveRule(rule || style, props, renderer),
          props
        )}`

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
