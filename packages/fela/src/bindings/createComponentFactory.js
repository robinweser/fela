/* @flow */
import {
  extractPassThroughProps,
  extractUsedProps,
  resolvePassThrough,
  resolveUsedProps
} from 'fela-utils'
import combineRules from '../combineRules'

export default function createComponentFactory(
  createElement: Function,
  contextTypes?: Object,
  withProxy: boolean = false
): Function {
  return function createComponent(
    rule: Function,
    type: any = 'div',
    passThroughProps: Array<string> | Function = []
  ): Function {
    const displayName = rule.name ? rule.name : 'FelaComponent'
    const usedProps = withProxy ? extractUsedProps(rule) : {}
    const defaultProps = type.defaultProps || {}

    const FelaComponent = (
      { children, _felaRule, passThrough = [], ...otherProps },
      { renderer, theme }
    ) => {
      if (!renderer) {
        throw new Error(
          "createComponent() can't render styles without the renderer in the context. Missing react-fela's <Provider /> at the app root?"
        )
      }

      const combinedRule = _felaRule ? combineRules(rule, _felaRule) : rule
      const ruleProps = {
        ...defaultProps,
        ...otherProps
      }

      // improve developer experience with monolithic renderer
      if (renderer.prettySelectors) {
        const componentName =
          typeof type === 'string' ? type : type.displayName || type.name || ''

        combinedRule.selectorPrefix = `${displayName}_${componentName}__`
      }
      // compose passThrough props from arrays or functions
      const resolvedPassThrough = [
        ...resolvePassThrough(passThroughProps, ruleProps),
        ...resolvePassThrough(passThrough, ruleProps),
        ...(withProxy ? resolveUsedProps(usedProps, ruleProps) : [])
      ]

      // if the component renders into another Fela component
      // we pass down the combinedRule as well as both
      if (type._isFelaComponent) {
        return createElement(
          type,
          {
            _felaRule: combinedRule,
            passThrough: resolvedPassThrough,
            ...ruleProps
          },
          children
        )
      }

      const componentProps = extractPassThroughProps(
        resolvedPassThrough,
        ruleProps
      )

      ruleProps.theme = theme || {}

      // fela-native support
      if (renderer.isNativeRenderer) {
        const felaStyle = renderer.renderRule(combinedRule, ruleProps)
        componentProps.style = ruleProps.style
          ? [ruleProps.style, felaStyle]
          : felaStyle
      } else {
        if (ruleProps.style) {
          componentProps.style = ruleProps.style
        }

        const cls = ruleProps.className ? `${ruleProps.className} ` : ''
        componentProps.className =
          cls + renderer.renderRule(combinedRule, ruleProps)
      }

      if (ruleProps.id) {
        componentProps.id = ruleProps.id
      }

      if (ruleProps.innerRef) {
        componentProps.ref = ruleProps.innerRef
      }

      const customType = ruleProps.is || type
      return createElement(customType, componentProps, children)
    }

    if (contextTypes) {
      FelaComponent.contextTypes = contextTypes
    }

    // use the rule name as display name to better debug with react inspector
    FelaComponent.displayName = displayName
    FelaComponent._isFelaComponent = true

    return FelaComponent
  }
}
