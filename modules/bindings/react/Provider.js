import { Component, PropTypes } from 'react'
import render from '../../render'

export default class Provider extends Component {
  static propTypes =  { renderer: PropTypes.object };
  static childContextTypes = { renderer: PropTypes.object };

  componentDidMount() {
    const { mountNode, renderer } = this.props

    if (mountNode) {
      render(renderer, mountNode)
    }
  }

  getChildContext() {
    return { renderer: this.props.renderer }
  }

  render() {
    return this.props.children
  }
}
