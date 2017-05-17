/* @flow */
import Component from 'inferno-component'
import render from '../../dom/render'

export default class Provider extends Component {
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
    return this.props.children
  }
}
