// $FlowFixMe
import { useContext } from 'react'
import { combineRules } from 'fela'

import { RendererContext, ThemeContext } from './context'

export default function useFela(props = {}) {
  const renderer = useContext(RendererContext)
  const theme = useContext(ThemeContext) || {}

  if (!renderer) {
    throw new Error(
      'The "useFela" hook can only be used  inside a "RendererProvider"'
    )
  }

  const propsWithTheme = {
    ...props,
    theme,
  }

  function css(...rules) {
    return renderer.renderRule(combineRules(...rules), propsWithTheme)
  }

  return {
    renderer,
    theme,
    css,
  }
}
