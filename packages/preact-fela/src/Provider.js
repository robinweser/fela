/* @flow */
import { Component } from 'preact'
import { render } from 'fela-dom'

export default class Provider extends Component {
  getChildContext() {
    return { renderer: this.props.renderer }
  }

  componentDidMount() {
    render(this.props.renderer)
  }

  render() {
    return this.props.children[0]
  }
}
