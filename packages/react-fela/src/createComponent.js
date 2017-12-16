/* @flow */
import { createElement } from 'react'
import PropTypes from 'prop-types'
import { createComponentFactory, THEME_CHANNEL } from 'fela-bindings'

import withTheme from './withTheme'

export default createComponentFactory(createElement, withTheme, {
  renderer: PropTypes.object,
  [THEME_CHANNEL]: PropTypes.object,
})
