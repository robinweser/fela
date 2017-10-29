import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-fela'
import App from './app'
import createRenderer from './renderer'

const renderer = createRenderer()

hydrate(
  <Provider renderer={renderer}>
    <App />
  </Provider>,
  document.getElementById('app')
)
