import React from 'react'
import { render } from 'react-dom'
import { RendererProvider } from 'react-fela'
import App from './app'
import createRenderer from './renderer'

const renderer = createRenderer()

render(
  <RendererProvider renderer={renderer}>
    <App />
  </RendererProvider>,
  document.getElementById('app')
)
