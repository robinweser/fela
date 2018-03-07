/* @flow */
import resolveRule from './resolveRule'

export default function FelaComponentFactory(
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent({ render = 'div', style, children }, { renderer }) {
    return createElement(FelaTheme, {
      render: theme => {
        const className = renderer._renderStyle(
          resolveRule(style, theme, renderer),
          theme
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
