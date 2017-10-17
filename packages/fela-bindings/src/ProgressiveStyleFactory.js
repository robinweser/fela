/* @flow */
export default function ProgressiveStyleFactory(
  createElement: Function,
  BaseComponent: any,
  renderToComponent: Function
): any {
  return class ControlledStyle extends BaseComponent {
    componentWillUnmount() {
      arrayEach(this.props.cacheEntries, this.props.emitChange)
    }

    shouldComponentUpdate() {
      return false
    }

    render() {
      return renderToComponent({
        mediaQueryOrder: this.props.mediaQueryOrder,
        cache: this.props.cacheEntries
      })
    }
  }
}
