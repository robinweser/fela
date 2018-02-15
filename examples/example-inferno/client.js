import Inferno, { render } from 'inferno'
import { Provider } from 'inferno-fela'
import App from './app'
import createRenderer from './renderer'

const renderer = createRenderer()

render(
  <Provider renderer={renderer}>
    <App />
  </Provider>,
  document.getElementById('app')
)
