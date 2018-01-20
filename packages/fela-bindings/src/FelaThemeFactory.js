/* @flow */
import { THEME_CHANNEL } from './themeChannel'

export default function FelaThemeFactory(
  BaseComponent: any,
  contextTypes?: Object
): any {
  class FelaTheme extends BaseComponent {
    unsubscribe: ?Function
    constructor(props, context) {
      super(props, context)

      this.state = {
        theme: context[THEME_CHANNEL] ? context[THEME_CHANNEL].get() : {},
      }
    }

    componentWillMount() {
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
      return this.props.render(this.state.theme)
    }
  }

  if (contextTypes) {
    FelaTheme.contextTypes = contextTypes
  }

  return FelaTheme
}
