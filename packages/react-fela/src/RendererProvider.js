/* @flow */
import { Component, Children, createElement } from 'react'
import { RendererProviderFactory } from 'fela-bindings'
import PropTypes from 'prop-types'

import { RendererContext } from './context'

export default RendererProviderFactory(
  Component,
  RendererContext,
  createElement,
  children => Children.only(children),
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
