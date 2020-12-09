/* eslint-disable react/prop-types */
import React from 'react'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'

import View from './View'

const renderer = createRenderer()

export default function Provider({ children }) {
  return (
    <RendererProvider renderer={renderer}>
      <View>{children}</View>
    </RendererProvider>
  )
}
