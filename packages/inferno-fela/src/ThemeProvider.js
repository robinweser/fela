/* @flow */
import { Component } from 'inferno'
import { createElement } from 'inferno-create-element'
import { ThemeProviderFactory } from 'fela-bindings'

import { ThemeContext } from './context'

export default ThemeProviderFactory(
  Component,
  ThemeContext,
  createElement,
  children => children,
  {
    defaultProps: {
      overwrite: false,
    },
  }
)
