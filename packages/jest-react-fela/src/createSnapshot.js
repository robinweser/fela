import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createRenderer } from 'fela'
import { RendererProvider, ThemeProvider } from 'react-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

function renderToMarkup(component) {
  return renderToStaticMarkup(component)
}

export default createSnapshotFactory(
  createElement,
  renderToMarkup,
  createRenderer(),
  RendererProvider,
  ThemeProvider
)
