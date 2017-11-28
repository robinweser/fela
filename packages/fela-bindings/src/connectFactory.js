/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import generateDisplayName from './generateDisplayName'
import hoistStatics from './hoistStatics'

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
          const { _felaTheme, ...otherProps } = this.props

          const preparedRules =
            typeof rules === 'function' ? rules(this.props) : rules

          const styles = objectReduce(
            preparedRules,
            (styleMap, rule, name) => {
              const preparedRule =
                typeof rule !== 'function' ? () => rule : rule
              styleMap[name] = renderer.renderRule(preparedRule, {
                ...otherProps,
                theme: _felaTheme,
              })

              return styleMap
            },
            {}
          )

          return createElement(component, {
            ...otherProps,
            styles,
          })
        }
      }

      if (contextTypes) {
        EnhancedComponent.contextTypes = contextTypes
      }

      const themedComponent = withTheme(EnhancedComponent, '_felaTheme')
      return hoistStatics(themedComponent, component)
    }
  }
}
