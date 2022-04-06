import { createElement } from 'react'
import { render } from 'react-dom'
import { createRenderer } from 'fela'
import { RendererProvider, ThemeProvider } from 'react-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

let createRoot
try {
  const ReactDOMClient = require('react-dom/client')
  if (
    typeof ReactDOMClient !== 'undefined' &&
    typeof ReactDOMClient.createRoot !== 'undefined'
  ) {
    createRoot = ReactDOMClient.createRoot
  }
} catch (e) {}

function renderComponent(component, node) {
  if (createRoot) {
    const root = ReactDOMClient.createRoot(component)
    root.render(node)
  } else {
    render(component, node)
  }
}

export default createSnapshotFactory(
  createElement,
  renderComponent,
  createRenderer(),
  RendererProvider,
  ThemeProvider
)
