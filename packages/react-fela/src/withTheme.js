/* @flow */
import { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import { withThemeFactory } from 'fela'

export default withThemeFactory(Component, createElement, {
  theme: PropTypes.object
})
