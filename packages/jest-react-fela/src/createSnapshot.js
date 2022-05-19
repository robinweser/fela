import { createElement } from 'react'
import { createRenderer } from 'fela'
import { renderToStaticMarkup } from 'react-dom/server'
import { render } from 'react-dom'
import { RendererProvider, ThemeProvider } from 'react-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

const renderToMarkup =
  typeof window === 'undefined' ? { renderToStaticMarkup } : { render }

export default createSnapshotFactory(
  createElement,
  renderToMarkup,
  createRenderer(),
  RendererProvider,
  ThemeProvider
)
