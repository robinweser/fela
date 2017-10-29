import { createElement, Component } from 'react'
import { ProgressiveStyleFactory } from 'fela-bindings'

import renderToComponent from './renderToComponent'

export default ProgressiveStyleFactory(
  Component,
  createElement,
  renderToComponent
)
