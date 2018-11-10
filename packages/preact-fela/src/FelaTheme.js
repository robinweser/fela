/* @flow */
// $FlowFixMe
import { h as createElement } from 'preact'
import { FelaThemeFactory } from 'fela-bindings'

import { ThemeContext } from './context'

export default FelaThemeFactory(createElement, ThemeContext)
