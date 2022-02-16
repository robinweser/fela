export default function FelaThemeFactory(createElement, ThemeContext) {
  function FelaTheme({ children }) {
    const renderFn = children

    return createElement(ThemeContext.Consumer, undefined, renderFn)
  }

  return FelaTheme
}
