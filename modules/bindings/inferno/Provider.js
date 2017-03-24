/* @flow */
import Component from 'inferno-component'
import render from '../../dom/render'

export default class Provider extends Component {
  getChildContext() {
    return { renderer: this.props.renderer }
  }

  componentDidMount() {
    render(this.props.renderer)
  }

  render() {
    return this.props.children
  }
}
