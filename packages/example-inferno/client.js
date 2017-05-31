import Inferno from 'inferno'
import { render } from 'inferno'
import { Provider } from 'inferno-fela'

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
