/* @flow */
import { createElement } from 'inferno-create-element'
import { createComponentFactory } from 'fela-bindings'

import withTheme from './withTheme'

export default createComponentFactory(createElement, withTheme, undefined, true)
