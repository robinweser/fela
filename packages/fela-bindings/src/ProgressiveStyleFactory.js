/* @flow */
import forEach from 'lodash/forEach'

export default function ProgressiveStyleFactory(
  BaseComponent: any,
  createElement: Function,
  renderToComponent: Function
): any {
  return class ProgressiveStyle extends BaseComponent {
    componentWillUnmount() {
      forEach(this.props.cacheEntries, this.props.renderer._emitChange)
    }

    shouldComponentUpdate() {
      return false
    }

    render() {
      return renderToComponent({
        ...this.props.renderer,
        cache: this.props.cacheEntries
      })
    }
  }
}
