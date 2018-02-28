/* @flow */
import { combineRules } from 'fela'

import resolveRule from './resolveRule'

export default function FelaComponentFactory(
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent({ render = 'div', style, children }, { renderer }) {
    return createElement(FelaTheme, {
      render: theme => {
        const props = { theme }

        const className = renderer._renderStyle(
          resolveRule(style, props, renderer),
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
