/* @flow */
import { Component, Children } from 'react'
import { ThemeProviderFactory } from 'fela-bindings'
import PropTypes from 'prop-types'

export default ThemeProviderFactory(
  Component,
  children => Children.only(children),
  {
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
  }
)
