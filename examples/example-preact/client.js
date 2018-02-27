import { render, h } from 'preact'
import { Provider } from 'preact-fela'
import App from './app'
import createRenderer from './renderer'

const renderer = createRenderer()

render(
  <Provider renderer={renderer}>
    <App />
  </Provider>,
  document.getElementById('app'),
  document.getElementById('app').lastElementChild
)
