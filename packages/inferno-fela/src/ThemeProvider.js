/* @flow */
import { createElement } from 'inferno-create-element'
import { ThemeProviderFactory } from 'fela-bindings'

import { ThemeContext } from './context'

export default ThemeProviderFactory(
  ThemeContext,
  createElement,
  children => children
)
