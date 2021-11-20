/* @flow */
import { Component, createElement } from 'react'
import { RendererProviderFactory } from 'fela-bindings'
import PropTypes from 'prop-types'

import { RendererContext } from './context'

export default RendererProviderFactory(
  Component,
  RendererContext,
  createElement,
  (children) => children,
  {
    propTypes: {
      renderer: PropTypes.object.isRequired,
      rehydrate: PropTypes.bool.isRequired,
    },
    defaultProps: {
      rehydrate: true,
    },
  }
)
