/* @flow */
import Component from 'inferno-component'
import { ProviderFactory } from 'fela'

export default ProviderFactory(Component, children => children, {
  defaultProps: {
    rehydrate: true
  }
})
