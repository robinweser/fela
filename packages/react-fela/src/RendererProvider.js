/* @flow */
import { Component, Children } from 'react'
import { RendererProviderFactory } from 'fela-bindings'
import PropTypes from 'prop-types'

export default RendererProviderFactory(
  Component,
  children => Children.only(children),
  {
    propTypes: {
      renderer: PropTypes.object.isRequired,
      rehydrate: PropTypes.bool.isRequired,
    },
    childContextTypes: {
      renderer: PropTypes.object,
    },
    defaultProps: {
      renderToDOM: true,
      rehydrate: true,
    },
  }
)
