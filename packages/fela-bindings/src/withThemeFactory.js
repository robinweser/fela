/* @flow */
import hoistStatics from './hoistStatics'

export default function withThemeFactory(
  createElement: Function,
  FelaTheme: Function
): Function {
  return function withTheme(
    component: Object,
    propName?: string = 'theme'
  ): Object {
    const WithTheme = props =>
      createElement(FelaTheme, undefined, theme =>
        createElement(component, {
          ...props,
          [propName]: theme,
        })
      )

    return hoistStatics(WithTheme, component)
  }
}
