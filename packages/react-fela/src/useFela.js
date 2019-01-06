/* @flow */
import { useContext } from 'react'
import { combineRules } from 'fela'

import { RendererContext, ThemeContext } from './context'

type HookInterface = {
  css: Function,
  theme: Object,
}

export default function useFela(props: Object = {}): HookInterface {
  const renderer = useContext(RendererContext)
  const theme = useContext(ThemeContext)

  function css(...rules: Array<Object | Function>) {
    return renderer.renderRule(combineRules(...rules), props)
  }

  return {
    theme,
    css,
  }
}
