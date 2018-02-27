/* @flow */
import { Component } from 'preact'
import { ProviderFactory } from 'fela-bindings'

export default ProviderFactory(Component, children => children[0], {
  defaultProps: {
    renderToDOM: true,
    rehydrate: true,
  },
})
