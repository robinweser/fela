/* @flow */
import { Component } from 'preact'
import { RendererProviderFactory } from 'fela-bindings'

export default RendererProviderFactory(Component, children => children[0], {
  defaultProps: {
    renderToDOM: true,
    rehydrate: true,
  },
})
