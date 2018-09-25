import { createElement } from 'react'
import { render } from 'react-dom'
import { createRenderer } from 'fela'
import { Provider, ThemeProvider } from 'react-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

export default createSnapshotFactory(
  createElement,
  render,
  createRenderer(),
  Provider,
  ThemeProvider
)
