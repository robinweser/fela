/* @flow */
import deprecated_connect from './connect'
import deprecated_createComponent from './createComponent'
import deprecated_createComponentWithProxy from './createComponentWithProxy'
import FelaComponent from './FelaComponent'
import FelaTheme from './FelaTheme'
import RendererProvider from './RendererProvider'
import ThemeProvider from './ThemeProvider'
import deprecated_withTheme from './withTheme'
import fe from './fe'

import { pipeDeprecation, interceptDeprecation } from './deprecate'

const withTheme = pipeDeprecation(
  deprecated_withTheme,
  `preact-fela's withTheme() HoC is deprecated.
In order to provide a minimal, robust and performant API, we are moving everything over to render-props APIs.
Use the <FelaTheme> component instead. See http://fela.js.org/docs/api/bindings/FelaTheme.html`
)

const connect = pipeDeprecation(
  deprecated_connect,
  `preact-fela's connect() HoC is deprecated.
In order to provide a minimal, robust and performant API, we are moving everything over to render-props APIs.
Use the <FelaComponent> component instead. See http://fela.js.org/docs/api/bindings/FelaComponent.html`
)

const createComponent = pipeDeprecation(
  deprecated_createComponent,
  `preact-fela's createComponent() HoC is deprecated.
In order to provide a minimal, robust and performant API, we are moving everything over to render-props APIs.
Use the <FelaComponent> component instead. See http://fela.js.org/docs/api/bindings/FelaComponent.html`
)

const createComponentWithProxy = pipeDeprecation(
  deprecated_createComponentWithProxy,
  `preact-fela's createComponentWithProxy() HoC is deprecated.
In order to provide a minimal, robust and performant API, we are moving everything over to render-props APIs.
Use the <FelaComponent> component instead. See http://fela.js.org/docs/api/bindings/FelaComponent.html`
)

const Provider = interceptDeprecation(
  RendererProvider,
  `Importing 'Provider' from preact-fela is deprecated. Import 'RendererProvider' instead.`
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
