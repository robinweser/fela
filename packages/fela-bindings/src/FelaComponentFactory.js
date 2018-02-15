/* @flow */
import { combineRules } from 'fela'

export default function FelaComponentFactory(
  BaseComponent: any,
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent({ render = 'div', style, children }, { renderer }) {
    return createElement(FelaTheme, {
      render: theme => {
        const className = renderer.renderRule(style, theme)

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
