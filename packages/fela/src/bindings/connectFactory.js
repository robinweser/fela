/* @flow */
import { objectReduce } from 'fela-utils'
import generateDisplayName from './generateDisplayName'

export default function connectFactory(
  BaseComponent: any,
  createElement: Function,
  contextTypes?: Object
): Function {
  return function connect(rules: Object): Function {
    return (component: any): any => {
      class EnhancedComponent extends BaseComponent {
        static displayName = generateDisplayName(component)
        static defaultProps = component.defaultProps || {}

        render() {
          const { renderer, theme } = this.context

          const styleProps = {
            ...this.props,
            theme: theme || {}
          }

          const styles = objectReduce(
            rules,
            (styleMap, rule, name) => {
              styleMap[name] = renderer.renderRule(rule, styleProps)
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
