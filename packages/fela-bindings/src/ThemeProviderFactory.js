/* @flow */
import shallowEqual from 'shallow-equal/objects'
import objectEach from 'fast-loops/lib/objectEach'

export default function ThemeProviderFactory(
  BaseComponent: any,
  ThemeContext: any,
  createElement: Function,
  renderChildren: Function,
  statics?: Object
): any {
  class ThemeProvider extends BaseComponent {
    shouldComponentUpdate(nextProps) {
      return !shallowEqual(this.props.theme, nextProps.theme)
    }

    render(): Object {
      return createElement(
        ThemeContext.Provider,
        {
          value: this.props.theme,
        },
        renderChildren(this.props.children)
      )
    }
  }

  if (statics) {
    objectEach(statics, (value, key) => {
      ThemeProvider[key] = value
    })
  }

  return ThemeProvider
}
