/* @flow */
import Component from 'inferno-component'
import { ThemeProviderFactory } from 'fela-bindings'

export default ThemeProviderFactory(Component, children => children, {
  defaultProps: {
    overwrite: false
  }
})
