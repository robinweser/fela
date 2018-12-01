/* @flow */
import connect from './connect'
import createComponent from './createComponent'
import createComponentWithProxy from './createComponentWithProxy'
import FelaComponent from './FelaComponent'
import FelaTheme from './FelaTheme'
import RendererProvider from './RendererProvider'
import ThemeProvider from './ThemeProvider'
import withTheme from './withTheme'
import fe from './fe'

import { interceptDeprecation } from './_deprecate'

const Provider = interceptDeprecation(
  RendererProvider,
  'Importing `Provider` from react-fela is deprecated. Import `RendererProvider` instead.\nSee http://fela.js.org/docs/api/bindings/renderer-provider'
)

export {
  connect,
  createComponent,
  createComponentWithProxy,
  FelaComponent,
  FelaTheme,
  Provider,
  RendererProvider,
  ThemeProvider,
  withTheme,
  fe,
}
