/* @flow */
import { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import { withThemeFactory, THEME_CHANNEL } from 'fela-bindings'

export default withThemeFactory(Component, createElement, {
  [THEME_CHANNEL]: PropTypes.object,
})
