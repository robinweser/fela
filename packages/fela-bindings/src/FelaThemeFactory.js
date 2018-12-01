/* @flow */
import deprecate from './_deprecate'

export default function FelaThemeFactory(
  createElement: Function,
  ThemeContext: any
): any {
  function FelaTheme({ children, render }) {
    // TODO: remove with 11.0.0
    deprecate(
      render !== undefined,
      'The `render` prop in FelaTheme is deprecated. It will be removed in react-fela@11.0.0.\nPlease always use `children` instead. See http://fela.js.org/docs/api/bindings/fela-theme'
    )

    const renderFn = children || render

    return createElement(ThemeContext.Consumer, undefined, renderFn)
  }

  return FelaTheme
}
