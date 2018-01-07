/* @flow */
import { createElement } from 'react'
import PropTypes from 'prop-types'
import { createComponentFactory, THEME_CHANNEL } from 'fela-bindings'

import withTheme from './withTheme'
import ProgressiveStyle from './ProgressiveStyle'

export default createComponentFactory(
  createElement,
  withTheme,
  ProgressiveStyle,
  {
    renderer: PropTypes.object,
    [THEME_CHANNEL]: PropTypes.object,
  }
)
