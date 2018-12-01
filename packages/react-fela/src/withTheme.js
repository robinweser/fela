/* @flow */
import { createElement } from 'react'
import { withThemeFactory } from 'fela-bindings'

import FelaTheme from './FelaTheme'

export default withThemeFactory(createElement, FelaTheme)
