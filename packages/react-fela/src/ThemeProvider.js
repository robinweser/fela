/* @flow */
import { Component } from 'react'
import { ThemeProviderFactory, THEME_CHANNEL } from 'fela-bindings'
import PropTypes from 'prop-types'

export default ThemeProviderFactory(Component, children => children, {
  propTypes: {
    theme: PropTypes.object.isRequired,
    overwrite: PropTypes.bool,
  },
  childContextTypes: {
    [THEME_CHANNEL]: PropTypes.object,
  },
  contextTypes: {
    [THEME_CHANNEL]: PropTypes.object,
  },
  defaultProps: {
    overwrite: false,
  },
})
