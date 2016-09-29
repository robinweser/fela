import React from 'react'
import { AppRegistry } from 'react-native'
import { createRenderer } from 'fela-native'
import { Provider } from 'react-fela'

import App from './App'

const renderer = createRenderer()

const wrappedApp = _ => (
  <Provider renderer={renderer}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('FelaNative', () => wrappedApp)
