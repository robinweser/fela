/* @flow */
import { createElement } from 'react'
import PropTypes from 'prop-types'

import createComponentFactory from '../createComponentFactory'

export default createComponentFactory(createElement, {
  renderer: PropTypes.object,
  theme: PropTypes.object
})
