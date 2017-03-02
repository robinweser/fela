/* @flow weak */
/* eslint-disable import/no-unresolved, import/extensions */
import Component from 'inferno-component'
import createElement from 'inferno-create-element'

const generateDisplayName = (Comp) => {
  const displayName = Comp.displayName || Comp.name
  if (displayName) {
    return `Fela${displayName}`
  }

  return 'ConnectedFelaComponent'
}

export default function connect(mapStylesToProps) {
  return Comp => class EnhancedComponent extends Component {
    // reuse the initial displayName name
    static displayName = generateDisplayName(Comp);

    render() {
      // invoke props and renderer to render all styles
      const { renderer, theme } = this.context

      const styles = mapStylesToProps({
        ...this.props,
        theme: theme || {}
      })(renderer)

      return createElement(Comp, {
        ...this.props,
        styles
      })
    }
  }
}
