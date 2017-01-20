import Component from 'inferno-component'
import { render } from 'fela'

export default class Provider extends Component {
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
