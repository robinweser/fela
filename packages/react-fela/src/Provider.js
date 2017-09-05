/* @flow */
import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { render, rehydrateCache } from 'fela-dom'

function hasDOM(renderer) {
  return !renderer.isNativeRenderer && typeof window !== 'undefined'
}

export default class Provider extends Component {
  static childContextTypes = { renderer: PropTypes.object }
  static propTypes = {
    renderer: PropTypes.object.isRequired
  }

  constructor(props: Object, context: Object) {
    super(props, context)

    if (hasDOM(props.renderer)) {
      rehydrateCache(this.props.renderer)
    }
  }

  componentDidMount() {
    if (hasDOM(this.props.renderer)) {
      render(this.props.renderer)
    }
  }

  getChildContext() {
    return { renderer: this.props.renderer }
  }

  render() {
    return Children.only(this.props.children)
  }
}
