/* @flow weak */
import { Component, PropTypes, Children } from 'react'
import render from '../../dom/render'

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
    return Children.only(this.props.children)
  }
}
