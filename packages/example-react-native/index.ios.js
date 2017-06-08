import React from 'react'
import { AppRegistry } from 'react-native'
import { createRenderer } from 'fela-native'
import { Provider } from 'react-fela'
import nativeMediaQuery, {
  DimensionProvider
} from 'fela-plugin-native-media-query'

import App from './App'

const renderer = createRenderer({ plugins: [nativeMediaQuery()] })

const wrappedApp = () => (
  <Provider renderer={renderer}>
    <DimensionProvider>
      <App />
    </DimensionProvider>
  </Provider>
)

AppRegistry.registerComponent('FelaNative', () => wrappedApp)
