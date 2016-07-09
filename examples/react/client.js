import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-fela'

import App from './app'

import createRenderer from './renderer'
const renderer = createRenderer(document.getElementById('font-stylesheet'))

const mountNode = document.getElementById('stylesheet')
mountNode.textContent = ''

render(
  <Provider renderer={renderer} mountNode={mountNode}>
    <App />
  </Provider>,
  document.getElementById('app')
)
