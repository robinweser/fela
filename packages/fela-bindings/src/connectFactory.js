/* @flow */
import { objectReduce, hoistStatics } from 'fela-utils'
import generateDisplayName from './generateDisplayName'

export default function connectFactory(
  BaseComponent: any,
  createElement: Function,
  withTheme: Function,
  contextTypes?: Object
): Function {
  return function connect(rules: Object | Function): Function {
    return (component: any): any => {
      class EnhancedComponent extends BaseComponent {
        static displayName = generateDisplayName(component)

        render() {
          const { renderer } = this.context

          const preparedRules =
            typeof rules === 'function' ? rules(this.props) : rules

          const styles = objectReduce(
            preparedRules,
            (styleMap, rule, name) => {
              const preparedRule =
                typeof rule !== 'function' ? () => rule : rule
              styleMap[name] = renderer.renderRule(preparedRule, this.props)
              return styleMap
            },
            {}
          )

          const { theme, ...propsWithoutTheme } = this.props
          return createElement(component, {
            ...propsWithoutTheme,
            styles
          })
        }
      }

      if (contextTypes) {
        EnhancedComponent.contextTypes = contextTypes
      }

      const themedComponent = withTheme(EnhancedComponent)
      return hoistStatics(themedComponent, component)
    }
  }
}
