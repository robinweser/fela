/* @flow */
export default function ThemeProviderFactory(
  ThemeContext: any,
  createElement: Function,
  renderChildren: Function
): any {
  return function ThemeProvider({ theme = {}, overwrite = false, children }) {
    return createElement(ThemeContext.Consumer, null, previousTheme =>
      createElement(
        ThemeContext.Provider,
        {
          value:
            !overwrite && previousTheme
              ? { ...previousTheme, ...theme }
              : theme,
        },
        renderChildren(children)
      )
    )
  }
}
