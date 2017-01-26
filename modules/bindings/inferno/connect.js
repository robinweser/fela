/* eslint-disable import/no-unresolved, import/extensions */
import Component from 'inferno-component'
import createElement from 'inferno-create-element'

export default function connect(mapStylesToProps) {
  return Comp => class EnhancedComponent extends Component {
    // reuse the initial displayName name
    static displayName = Comp.displayName || Comp.name || 'Component';

    render() {
      // invoke props and renderer to render all styles
      const styles = mapStylesToProps(this.props)(this.context.renderer)

      return createElement(Comp, {
        ...this.props,
        styles
      })
    }
  }
}
