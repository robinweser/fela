/* @flow */
// $FlowFixMe
import { h as createElement, Component } from 'preact'
import { connectFactory } from 'fela-bindings'

import { RendererContext } from './context'
import FelaTheme from './FelaTheme'

export default connectFactory(
  Component,
  createElement,
  RendererContext,
  FelaTheme
)
