/* @flow */
export default function FelaComponentFactory(
  BaseComponent: any,
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent({ render, rule, ...otherProps }, { renderer }) {
    return createElement(FelaTheme, {
      render: theme =>
        render({
          className: renderer.renderRule(rule, {
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
