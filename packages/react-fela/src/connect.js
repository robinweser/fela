/* @flow */
import { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import { connectFactory, THEME_CHANNEL } from 'fela-bindings'

import withTheme from './withTheme'

export default connectFactory(Component, createElement, withTheme, {
  renderer: PropTypes.object,
  [THEME_CHANNEL]: PropTypes.object,
})
