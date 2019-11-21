/* @flow */

export default function FelaThemeFactory(
  createElement: Function,
  ThemeContext: any
): any {
  function FelaTheme({ children }) {
    const renderFn = children

    return createElement(ThemeContext.Consumer, undefined, renderFn)
  }

  return FelaTheme
}
