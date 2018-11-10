/* @flow */
import { Component } from 'inferno'
import { createElement } from 'inferno-create-element'
import { connectFactory } from 'fela-bindings'

import { RendererContext } from './context'
import FelaTheme from './FelaTheme'

export default connectFactory(
  Component,
  createElement,
  RendererContext,
  FelaTheme
)
