/* @flow */
import connect from './connect'
import createComponent from './createComponent'
import createComponentWithProxy from './createComponentWithProxy'
import FelaComponent from './FelaComponent'
import FelaTheme from './FelaTheme'
import Provider from './Provider'
import RendererProvider from './RendererProvider'
import ThemeProvider from './ThemeProvider'
import withTheme from './withTheme'
import fe from './fe'

import { RendererContext, ThemeContext } from './context'

const FelaRenderer = RendererContext.Consumer

export {
  connect,
  createComponent,
  createComponentWithProxy,
  FelaComponent,
  FelaRenderer,
  FelaTheme,
  Provider,
  RendererContext,
  RendererProvider,
  ThemeContext,
  ThemeProvider,
  withTheme,
  fe,
}
