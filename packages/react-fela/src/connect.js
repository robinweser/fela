/* @flow */
import { Component, createElement } from 'react'
import PropTypes from 'prop-types'

import { connectFactory } from 'fela'

export default connectFactory(Component, createElement, {
  renderer: PropTypes.object,
  theme: PropTypes.object
})
