/* @flow */
import { h, Component } from 'preact'
import { connectFactory } from 'fela-bindings'

import withTheme from './withTheme'

export default connectFactory(Component, h, withTheme)
