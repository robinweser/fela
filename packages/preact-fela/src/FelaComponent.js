/* @flow */
// $FlowFixMe
import { h as createElement } from 'preact'
import { FelaComponentFactory } from 'fela-bindings'

import { RendererContext } from './context'
import FelaTheme from './FelaTheme'

export default FelaComponentFactory(createElement, RendererContext, FelaTheme)
