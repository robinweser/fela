/* @flow */
import { Component, createElement, PropTypes } from 'react'

import connectFactory from '../connectFactory'

export default connectFactory(Component, createElement, {
  renderer: PropTypes.object,
  theme: PropTypes.object
})
