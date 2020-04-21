import React from 'react'
import { AppRegistry } from 'react-native'
import { createRenderer } from 'fela-native'
import { RendererProvider } from 'react-fela'
import nativeMediaQuery, {
  DimensionProvider,
} from 'fela-plugin-native-media-query'

import App from './App'

const renderer = createRenderer({ plugins: [nativeMediaQuery()] })

const wrappedApp = () => (
  <RendererProvider renderer={renderer}>
    <DimensionProvider>
      <App />
    </DimensionProvider>
  </RendererProvider>
)

AppRegistry.registerComponent('FelaNative', () => wrappedApp)
