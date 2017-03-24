/* @flow */
import { createElement, PropTypes } from 'react'

import createComponentFactory from '../createComponentFactory'

export default createComponentFactory(createElement, {
  renderer: PropTypes.object,
  theme: PropTypes.object
})
