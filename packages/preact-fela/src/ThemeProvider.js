/* @flow */
// $FlowFixMe
import { Component, h as createElement } from 'preact'
import { ThemeProviderFactory } from 'fela-bindings'

import { ThemeContext } from './context'

export default ThemeProviderFactory(
  Component,
  ThemeContext,
  createElement,
  ([children]) => children,
  {
    defaultProps: {
      overwrite: false,
    },
  }
)
