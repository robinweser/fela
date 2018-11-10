/* @flow */
import { createElement } from 'inferno-create-element'
import { createComponentFactory } from 'fela-bindings'

import { RendererContext } from './context'
import FelaTheme from './FelaTheme'

export default createComponentFactory(
  createElement,
  RendererContext,
  FelaTheme,
  true
)
