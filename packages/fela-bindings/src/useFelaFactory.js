import { combineRules } from 'fela'

function getPropsWithTheme(props, theme) {
  if (props) {
    return {
      ...props,
      theme,
    }
  }

  return {
    theme,
  }
}

export default function useFelaFactory(
  RendererContext,
  ThemeContext,
  useContext
) {
  return function useFela(props) {
    const renderer = useContext(RendererContext)
    const theme = useContext(ThemeContext) || {}

    if (!renderer) {
      throw new Error(
        'The "useFela" hook can only be used inside a "RendererProvider"'
      )
    }

    // we add the theme to props so that it can be used within styles
    const propsWithTheme = getPropsWithTheme(props, theme)

    function css(...rules) {
      return renderer.renderRule(combineRules(...rules), propsWithTheme)
    }

    function staticStyle(style, selector) {
      return renderer.renderStatic(style, selector, propsWithTheme)
    }

    return {
      renderer,
      theme,
      css,
      staticStyle,
    }
  }
}
