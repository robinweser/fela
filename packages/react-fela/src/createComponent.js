/* @flow */
import { createElement } from 'react'
import PropTypes from 'prop-types'
import { createComponentFactory } from 'fela-bindings'

import withTheme from './withTheme'

export default createComponentFactory(createElement, withTheme, {
  renderer: PropTypes.object,
  theme: PropTypes.object
})
