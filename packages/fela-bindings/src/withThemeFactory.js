import hoistStatics from './hoistStatics'

export default function withThemeFactory(createElement, FelaTheme) {
  return function withTheme(component, propName = 'theme') {
    const WithTheme = (props) =>
      createElement(FelaTheme, undefined, (theme) =>
        createElement(component, {
          ...props,
          [propName]: theme,
        })
      )

    return hoistStatics(WithTheme, component)
  }
}
