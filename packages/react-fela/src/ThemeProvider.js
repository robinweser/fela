import { createElement } from 'react'
import { ThemeProviderFactory } from 'fela-bindings'

import { ThemeContext } from './context'

export default ThemeProviderFactory(
  ThemeContext,
  createElement,
  (children) => children
)
