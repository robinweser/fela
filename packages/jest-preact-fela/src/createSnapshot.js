import { createElement, render } from 'preact'
import { createRenderer } from 'fela'
import { RendererProvider, ThemeProvider } from 'preact-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

export default createSnapshotFactory(
  createElement,
  render,
  createRenderer(),
  RendererProvider,
  ThemeProvider
)
