/* @flow */
import { createElement } from 'inferno-create-element'
import { FelaThemeFactory } from 'fela-bindings'

import { ThemeContext } from './context'

export default FelaThemeFactory(createElement, ThemeContext)
