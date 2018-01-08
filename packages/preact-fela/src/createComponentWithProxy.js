/* @flow */
import { h } from 'preact'
import { createComponentFactory } from 'fela-bindings'

import withTheme from './withTheme'

export default createComponentFactory(h, withTheme, undefined, true)
