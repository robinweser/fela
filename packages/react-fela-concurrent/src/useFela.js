/* @flow */
// $FlowFixMe
import { useContext } from 'react'
import { combineRules } from 'fela'

import { RendererContext, ThemeContext } from './context'

export default function useFela(props: Object = {}): HookInterface {
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

  function css(...rules: Array<Object | Function>) {
    const changes = []

    if (!renderer.isLoaded) {
      renderer._emitChange = (change) => changes.push(change)
    }

    const className = renderer.renderRule(
      combineRules(...rules),
      propsWithTheme
    )

    return [className, changes]
  }

  return {
    renderer,
    theme,
    css,
  }
}
