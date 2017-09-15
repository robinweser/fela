/* @flow */
import { hoistStatics } from 'fela-utils'

export default function withThemeFactory(
  BaseComponent: any,
  createElement: Function,
  contextTypes?: Object
): Function {
  return function withTheme(component: Object): Object {
    class WithTheme extends BaseComponent {
      state: {
        theme: Object
      }

      unsubscribe: ?Function

      constructor(props: Object, context: Object) {
        super(props, context)

        this.state = {
          theme: context.theme ? context.theme.get() : {}
        }
      }

      componentWillMount() {
        if (this.context.theme) {
          this.unsubscribe = this.context.theme.subscribe(properties =>
            this.setState({
              theme: properties
            })
          )
        }
      }

      componentWillUnmount() {
        if (this.unsubscribe) {
          this.unsubscribe()
        }
      }

      render() {
        const { innerRef, ...passProps } = this.props

        if (innerRef) {
          if (component._isFelaComponent) {
            passProps.innerRef = innerRef
          } else {
            passProps.ref = innerRef
          }
        }

        return createElement(component, {
          ...passProps,
          theme: this.state.theme
        })
      }
    }

    if (contextTypes) {
      WithTheme.contextTypes = contextTypes
    }

    return hoistStatics(WithTheme, component)
  }
}
