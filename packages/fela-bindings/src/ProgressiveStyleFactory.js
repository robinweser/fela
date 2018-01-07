/* @flow */
import arrayEach from 'fast-loops/lib/arrayEach'

export default function ProgressiveStyleFactory(
  BaseComponent: any,
  createElement: Function,
  renderToComponent: Function
): any {
  return class ProgressiveStyle extends BaseComponent {
    componentWillUnmount() {
      arrayEach(this.props.cacheEntries, this.props.renderer._emitChange)
    }

    shouldComponentUpdate() {
      return false
    }

    render() {
      return renderToComponent({
        ...this.props.renderer,
        cache: this.props.cacheEntries,
      })
    }
  }
}
