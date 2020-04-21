import { render, h } from 'preact'
import { RendererProvider } from 'preact-fela'
import App from './app'
import createRenderer from './renderer'

const renderer = createRenderer()

render(
  <RendererProvider renderer={renderer}>
    <App />
  </RendererProvider>,
  document.getElementById('app'),
  document.getElementById('app').lastElementChild
)
