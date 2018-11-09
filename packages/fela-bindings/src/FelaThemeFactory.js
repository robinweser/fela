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
      const { children, render } = this.props

      // TODO: remove with 11.0.0
      deprecate(
        render !== undefined,
        'The `render` prop in FelaTheme is deprecated. It will be removed in react-fela@11.0.0.\nPlease always use `children` instead. See http://fela.js.org/docs/api/bindings/fela-theme'
      )

      const renderFn = children || render
      return renderFn(this.state.theme)

      // return this.props.children(this.state.theme)
    }
  }

  if (contextTypes) {
    FelaTheme.contextTypes = contextTypes
  }

  return FelaTheme
}
