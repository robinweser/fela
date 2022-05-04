import { render } from 'inferno'
import { createElement } from 'inferno-create-element'
import { createRenderer } from 'fela'
import { RendererProvider, ThemeProvider } from 'inferno-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

function renderToMarkup(component) {
  const div = document.createElement('div')

  render(component, div)

  return div.innerHTML
}

export default createSnapshotFactory(
  createElement,
  renderToMarkup,
  createRenderer(),
  RendererProvider,
  ThemeProvider
)
