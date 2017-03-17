/* @flow weak */
import { h, Component } from 'preact'

const generateDisplayName = (Comp) => {
  const displayName = Comp.displayName || Comp.name
  if (displayName) {
    return `Fela${displayName}`
  }

  return 'ConnectedFelaComponent'
}

export default function connect(mapStylesToProps) {
  return Comp =>
    class EnhancedComponent extends Component {
      // reuse the initial displayName name
      static displayName = generateDisplayName(Comp);

      render(props, state, { renderer, theme }) {
        const styles = mapStylesToProps({
          ...props,
          theme: theme || {}
        })(renderer)

        return h(Comp, {
          ...props,
          styles
        })
      }
    }
}
