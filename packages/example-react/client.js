import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-fela'
import App from './app'
import createRenderer from './renderer'

const renderer = createRenderer()

render(
  <Provider renderer={renderer}>
    <App />
  </Provider>,
  document.getElementById('app')
)
