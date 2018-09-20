/* @flow */
export default function FelaComponentFactory(
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent(
    { children, as = 'div', style, ...otherProps },
    { renderer }
  ) {
    return createElement(FelaTheme, undefined, theme => {
      const className =
        style instanceof Function
          ? renderer.renderRule(style, { theme, ...otherProps })
          : renderer._renderStyle(style, otherProps)

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
