/* @flow */
import objectEach from 'fast-loops/lib/objectEach'

export default function ThemeProviderFactory(
  BaseComponent: any,
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
