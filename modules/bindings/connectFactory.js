/* @flow */
import generateDisplayName from './generateDisplayName'

export default function connectFactory(
  BaseComponent: any,
  createElement: Function,
  contextTypes?: Object
): Function {
  return function connect(rules: Object): Function {
    return (component: any): any => {
      class EnhancedComponent extends BaseComponent {
        static displayName = generateDisplayName(component);

        render() {
          const { renderer, theme = {} } = this.context
          const styleProps = { ...this.props, theme }

          const styles = Object.keys(rules).reduce((sofar, key) => {
            const style = renderer.renderRule(rules[key], styleProps)
            return Object.assign(sofar, { [key]: style })
          }, {})

          const props = { ...this.props, styles }
          return createElement(component, props)
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
