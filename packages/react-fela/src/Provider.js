/* @flow */
import { Component, Children } from 'react'
import { ProviderFactory } from 'fela-bindings'
import PropTypes from 'prop-types'

export default ProviderFactory(Component, children => Children.only(children), {
  propTypes: {
    renderer: PropTypes.object.isRequired,
    rehydrate: PropTypes.bool.isRequired,
  },
  childContextTypes: {
    renderer: PropTypes.object,
  },
  defaultProps: {
    rehydrate: true,
  },
})
