/* @flow */
import { Component } from 'inferno'
import { ThemeProviderFactory } from 'fela-bindings'

export default ThemeProviderFactory(Component, children => children, {
  defaultProps: {
    overwrite: false,
  },
})
