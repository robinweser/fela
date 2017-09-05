/* @flow */
import Component from 'inferno-component'
import { render, rehydrateCache } from 'fela-dom'

function hasDOM() {
  return typeof window !== 'undefined'
}

export default class Provider extends Component {
  constructor(props: Object, context: Object) {
    super(props, context)

    if (hasDOM()) {
      rehydrateCache(this.props.renderer)
    }
  }

  getChildContext() {
    return { renderer: this.props.renderer }
  }

  componentDidMount() {
    if (hasDOM()) {
      render(this.props.renderer)
    }
  }

  render() {
    return this.props.children
  }
}
