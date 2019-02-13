/* @flow */
// $FlowFixMe
import { useContext } from 'react'
import { combineRules } from 'fela'

import { RendererContext, ThemeContext } from './context'

type HookInterface = {
  css: Function,
  theme: Object,
  renderer: Object,
}

export default function useFela(props: Object = {}): HookInterface {
  const renderer = useContext(RendererContext)
  const theme = useContext(ThemeContext) || {}

  const propsWithTheme = {
    ...props,
    theme,
  }

  function css(...rules: Array<Object | Function>) {
    return renderer.renderRule(combineRules(...rules), propsWithTheme)
  }

  return {
    renderer,
    theme,
    css,
  }
}
