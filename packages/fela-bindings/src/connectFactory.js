/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'
import objectEach from 'fast-loops/lib/objectEach'
import { combineMultiRules } from 'fela-tools'

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
        static _isFelaComponent = true

        render() {
          const { renderer } = this.context
          const { extend, _felaTheme, _felaRules, ...otherProps } = this.props

          const allRules = [rules]
          if (_felaRules) {
            allRules.push(_felaRules)
          }
          if (extend) {
            allRules.push(extend)
          }

          const combinedRules = combineMultiRules(...allRules)
          const preparedRules = combinedRules(
            {
              ...otherProps,
              theme: _felaTheme,
            },
            renderer
          )

          // improve developer experience with monolithic renderer
          if (
            process.env.NODE_ENV !== 'production' &&
            renderer.prettySelectors
          ) {
            const componentName =
              typeof component === 'string'
                ? component
                : component.displayName || component.name || ''

            objectEach(preparedRules, (rule, name) => {
              const displayName = rule.name ? rule.name : 'FelaComponent'
              rule.selectorPrefix = `${displayName}_${componentName}_${name}_`
            })
          }

          if (component._isFelaComponent) {
            return createElement(component, {
              _felaRules: combinedRules,
              ...otherProps,
            })
          }

          const styles = objectReduce(
            preparedRules,
            (styleMap, rule, name) => {
              styleMap[name] = renderer.renderRule(rule, {
                ...otherProps,
                theme: _felaTheme,
              })

              return styleMap
            },
            {}
          )

          const boundRules = objectReduce(
            preparedRules,
            (ruleMap, rule, name) => {
              ruleMap[name] = props =>
                rule(
                  {
                    theme: _felaTheme,
                    ...props,
                  },
                  renderer
                )

              return ruleMap
            },
            {}
          )

          return createElement(component, {
            ...otherProps,
            styles,
            rules: boundRules,
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
