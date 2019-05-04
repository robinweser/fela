/* @flow */
import { Component, createElement } from 'react'
import { connectFactory } from 'fela-bindings'

import { RendererContext, ThemeContext } from './context'

export default connectFactory(
  Component,
  createElement,
  RendererContext,
  ThemeContext
)
