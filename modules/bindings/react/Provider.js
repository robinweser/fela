/* @flow weak */
import { Component, PropTypes, Children } from 'react'
import render from '../../dom/render'

export default class Provider extends Component {
  static propTypes = { renderer: PropTypes.object.isRequired };
  static childContextTypes = { renderer: PropTypes.object };

  getChildContext() {
    return { renderer: this.props.renderer }
  }

  componentDidMount() {
    const { mountNode, renderer } = this.props

    if (mountNode) {
      render(renderer, mountNode)
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}
