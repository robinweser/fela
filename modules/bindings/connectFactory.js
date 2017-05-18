/* @flow */
import generateDisplayName from './generateDisplayName'
import objectReduce from '../utils/objectReduce'

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
          const styleProps = {
            ...this.props,
            theme
          }

          const styles = objectReduce(
            rules,
            (styleMap, rule) => {
              styleMap[rule] = renderer.renderRule(rules[rule], styleProps)
              return styleMap
            },
            {}
          )

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
