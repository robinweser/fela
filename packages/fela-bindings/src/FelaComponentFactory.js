/* @flow */
import { combineRules } from 'fela'

export default function FelaComponentFactory(
  BaseComponent: any,
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent(
    { render, rule, extend, ...otherProps },
    { renderer }
  ) {
    const combinedRule = extend ? combineRules(rule, extend) : rule

    return createElement(FelaTheme, {
      render: theme =>
        render({
          className: renderer.renderRule(combinedRule, {
            ...otherProps,
            theme,
          }),
          theme,
        }),
    })
  }

  if (contextTypes) {
    FelaComponent.contextTypes = contextTypes
  }

  return FelaComponent
}
