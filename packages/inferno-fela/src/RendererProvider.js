/* @flow */
import { Component } from 'inferno'
import { createElement } from 'inferno-create-element'
import { RendererProviderFactory } from 'fela-bindings'

import { RendererContext } from './context'

export default RendererProviderFactory(
  Component,
  RendererContext,
  createElement,
  children => children,
  {
    defaultProps: {
      renderToDOM: true,
      rehydrate: true,
    },
  }
)
