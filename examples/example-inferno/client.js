import Inferno, { render } from 'inferno'
import { RendererProvider } from 'inferno-fela'
import App from './app'
import createRenderer from './renderer'

const renderer = createRenderer()

render(
  <RendererProvider renderer={renderer}>
    <App />
  </RendererProvider>,
  document.getElementById('app')
)
