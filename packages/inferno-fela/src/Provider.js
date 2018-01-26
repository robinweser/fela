/* @flow */
import Component from 'inferno-component'
import { ProviderFactory } from 'fela-bindings'

export default ProviderFactory(Component, children => children, {
  defaultProps: {
    renderToDOM: true,
    rehydrate: true,
  },
})
