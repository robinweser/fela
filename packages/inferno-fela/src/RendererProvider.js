/* @flow */
import { Component } from 'inferno'
import { RendererProviderFactory } from 'fela-bindings'

export default RendererProviderFactory(Component, children => children, {
  defaultProps: {
    renderToDOM: true,
    rehydrate: true,
  },
})
