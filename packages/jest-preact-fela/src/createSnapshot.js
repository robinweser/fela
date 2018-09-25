import { createElement, render } from 'preact'
import { createRenderer } from 'fela'
import { Provider, ThemeProvider } from 'preact-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

export default createSnapshotFactory(
  createElement,
  render,
  createRenderer(),
  Provider,
  ThemeProvider
)
