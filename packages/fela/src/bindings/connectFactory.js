/* @flow */
import { objectReduce } from 'fela-utils'
import generateDisplayName from './generateDisplayName'
import hoistStatics from 'hoist-non-react-statics';

export default function connectFactory(
  BaseComponent: any,
  createElement: Function,
  contextTypes?: Object
): Function {
  return function connect(rules: Object | Function): Function {
    return (component: any): any => {
      class EnhancedComponent extends BaseComponent {
        static displayName = generateDisplayName(component)

        render() {
          const { renderer, theme } = this.context

          const styleProps = {
            ...this.props,
            theme: theme || {}
          }

          let styles

          if (typeof rules === 'function') {
            styles = rules(styleProps)(renderer)

            // deprecation warning
            if (process.env.NODE_ENV !== 'production' && !this.warnDeprecated) {
              /* eslint-disable no-console */
              console.warn(
                'Using a `mapStylesToProps` function with `connect` is deprecated. It will be removed soon. Use a direct `rules` object. See https://github.com/rofrischmann/fela/blob/master/packages/react-fela/docs/connect.md'
              )
              /* eslint-enable no-console */
              this.warnDeprecated = true
            }
          } else {
            styles = objectReduce(
              rules,
              (styleMap, rule, name) => {
                styleMap[name] = renderer.renderRule(rule, styleProps)
                return styleMap
              },
              {}
            )
          }

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

      // Re-attach static methods
      EnhancedComponent.childContextTypes = component.childContextTypes;
      EnhancedComponent.defaultProps = component.defaultProps;
      EnhancedComponent.getDefaultProps = component.getDefaultProps;
      EnhancedComponent.mixins = component.mixins;
      EnhancedComponent.propTypes = component.propTypes;
      EnhancedComponent.type = component.type;

      return hoistStatics(EnhancedComponent, component)
    }
  }
}
