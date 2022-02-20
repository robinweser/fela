/* eslint-disable react/prop-types */
import React from 'react'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import plugins from 'fela-preset-web'

import View from './View'

const renderer = createRenderer({
  plugins,
})

export default function Provider({ children }) {
  return (
    <RendererProvider renderer={renderer}>
      <View>{children}</View>
    </RendererProvider>
  )
}
