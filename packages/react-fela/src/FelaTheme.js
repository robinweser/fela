/* @flow */
import { Component } from 'react'
import PropTypes from 'prop-types'
import { FelaThemeFactory, THEME_CHANNEL } from 'fela-bindings'

export default FelaThemeFactory(Component, {
  [THEME_CHANNEL]: PropTypes.object,
})
