export default function ThemeProviderFactory(
  ThemeContext,
  createElement,
  renderChildren
) {
  return function ThemeProvider({ theme = {}, overwrite = false, children }) {
    return createElement(ThemeContext.Consumer, null, (previousTheme) =>
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
