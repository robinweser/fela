/* @flow */
import hoistStatics from './hoistStatics'
import { THEME_CHANNEL } from './themeChannel'

export default function withThemeFactory(
  BaseComponent: any,
  createElement: Function,
  contextTypes?: Object
): Function {
  return function withTheme(
    component: Object,
    propName?: string = 'theme'
  ): Object {
    class WithTheme extends BaseComponent {
      state: {
        theme: Object,
      }

      unsubscribe: ?Function

      constructor(props: Object, context: Object) {
        super(props, context)

        this.state = {
          theme: context[THEME_CHANNEL] ? context[THEME_CHANNEL].get() : {},
        }
      }

      componentDidMount() {
        if (this.context[THEME_CHANNEL]) {
          this.unsubscribe = this.context[THEME_CHANNEL].subscribe(properties =>
            this.setState({
              theme: properties,
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
        return createElement(component, {
          ...this.props,
          [propName]: this.state.theme,
        })
      }
    }

    if (contextTypes) {
      WithTheme.contextTypes = contextTypes
    }

    return hoistStatics(WithTheme, component)
  }
}
