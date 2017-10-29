/* @flow */
import { Component } from 'react'
import { ThemeProviderFactory } from 'fela-bindings'
import PropTypes from 'prop-types'

export default ThemeProviderFactory(Component, children => children, {
  propTypes: {
    theme: PropTypes.object.isRequired,
    overwrite: PropTypes.bool
  },
  childContextTypes: {
    theme: PropTypes.object
  },
  contextTypes: {
    theme: PropTypes.object
  },
  defaultProps: {
    overwrite: false
  }
})
