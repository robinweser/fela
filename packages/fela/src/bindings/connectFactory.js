/* @flow */
import generateDisplayName from './generateDisplayName'

export default function connectFactory(
  BaseComponent: any,
  createElement: Function,
  contextTypes?: Object
): Function {
  return function connect(mapStylesToProps: Function): Function {
    return (component: any): any => {
      class EnhancedComponent extends BaseComponent {
        static displayName = generateDisplayName(component);

        render() {
          const { renderer, theme } = this.context

          const styles = mapStylesToProps({
            ...this.props,
            theme: theme || {}
          })(renderer)

          return createElement(component, {
            ...this.props,
            styles
          })
        }
      }

      if (contextTypes) {
        EnhancedComponent.contextTypes = {
          ...component.contextTypes,
          ...contextTypes
        }
      }

      return EnhancedComponent
    }
  }
}
