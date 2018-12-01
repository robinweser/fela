/* @flow */
import { Component, createElement, Children } from 'react'
import { ThemeProviderFactory } from 'fela-bindings'
import PropTypes from 'prop-types'

import { ThemeContext } from './context'

export default ThemeProviderFactory(
  Component,
  ThemeContext,
  createElement,
  children => Children.only(children),
  {
    propTypes: {
      theme: PropTypes.object.isRequired,
      overwrite: PropTypes.bool,
    },
    defaultProps: {
      overwrite: false,
    },
  }
)
