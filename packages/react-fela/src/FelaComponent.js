/* @flow */
import { createElement } from 'react'
import PropTypes from 'prop-types'
import { FelaComponentFactory, THEME_CHANNEL } from 'fela-bindings'

import FelaTheme from './FelaTheme'

export default FelaComponentFactory(createElement, FelaTheme, {
  renderer: PropTypes.object,
  [THEME_CHANNEL]: PropTypes.object,
})
