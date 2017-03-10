import { render, h } from 'preact'
import { Provider } from 'preact-fela'

import App from './app'

import createRenderer from './renderer'

const renderer = createRenderer()

const mountNode = document.getElementById('stylesheet')

render(
  <Provider renderer={renderer} mountNode={mountNode}>
    <App />
  </Provider>,
  document.getElementById('app')
)
