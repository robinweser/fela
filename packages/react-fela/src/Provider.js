/* @flow */
import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { render } from 'fela-dom'

export default class Provider extends Component {
  static propTypes = { renderer: PropTypes.object.isRequired }
  static childContextTypes = { renderer: PropTypes.object }

  getChildContext() {
    return { renderer: this.props.renderer }
  }

  componentDidMount() {
    render(this.props.renderer)
  }

  render() {
    return Children.only(this.props.children)
  }
}
