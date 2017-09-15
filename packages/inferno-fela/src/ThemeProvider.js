/* @flow */
import Component from 'inferno-component'
import { ThemeProviderFactory } from 'fela'

export default ThemeProviderFactory(Component, children => children, {
  defaultProps: {
    overwrite: false
  }
})
