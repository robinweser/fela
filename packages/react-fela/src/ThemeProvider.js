/* @flow */
import { createElement, Children } from 'react'
import { ThemeProviderFactory } from 'fela-bindings'
import PropTypes from 'prop-types'

import { ThemeContext } from './context'

export default ThemeProviderFactory(ThemeContext, createElement, children =>
  Children.only(children)
)
