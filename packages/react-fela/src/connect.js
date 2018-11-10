/* @flow */
import { Component, createElement } from 'react'
import { connectFactory } from 'fela-bindings'

import { RendererContext } from './context'
import FelaTheme from './FelaTheme'

export default connectFactory(
  Component,
  createElement,
  RendererContext,
  FelaTheme
)
