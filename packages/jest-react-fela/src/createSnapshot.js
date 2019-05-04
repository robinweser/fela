import { createElement } from 'react'
import { render } from 'react-dom'
import { createRenderer } from 'fela'
import { RendererProvider, ThemeProvider } from 'react-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

export default createSnapshotFactory(
  createElement,
  render,
  createRenderer(),
  RendererProvider,
  ThemeProvider
)
