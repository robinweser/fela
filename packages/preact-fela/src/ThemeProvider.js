/* @flow */
import { Component } from 'preact'
import { ThemeProviderFactory } from 'fela-bindings'

export default ThemeProviderFactory(Component, children => children[0], {
  defaultProps: {
    overwrite: false
  }
})
