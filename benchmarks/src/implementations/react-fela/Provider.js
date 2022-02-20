/* eslint-disable react/prop-types */
import React from 'react'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import plugins from 'fela-preset-web'

import View from './View'

const [extend, embedded, unit, fallback, prefixer] = plugins

const renderer = createRenderer({
  plugins: [unit, fallback, prefixer],
})

export default function Provider({ children }) {
  return (
    <RendererProvider renderer={renderer}>
      <View>{children}</View>
    </RendererProvider>
  )
}
