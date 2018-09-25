import { render } from 'inferno'
import { createElement } from 'inferno-create-element'
import { createRenderer } from 'fela'
import { Provider, ThemeProvider } from 'inferno-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

export default createSnapshotFactory(
  createElement,
  render,
  createRenderer(),
  Provider,
  ThemeProvider
)
