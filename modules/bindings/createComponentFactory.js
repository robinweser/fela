/* @flow */
import extractPassThroughProps from '../utils/extractPassThroughProps'
import resolvePassThrough from '../utils/resolvePassThrough'
import combineRules from '../combineRules'

export default function createComponentFactory(
  createElement: Function,
  contextTypes?: Object
): Function {
  return function createComponent(
    rule: Function,
    type: string = 'div',
    passThroughProps: Array<string> | Function = []
  ): Function {
    const FelaComponent = (
      { children, _felaRule, passThrough = [], ...ruleProps },
      { renderer, theme }
    ) => {
      if (!renderer) {
        throw new Error(
          "createComponent() can't render styles without the renderer in the context. Missing react-fela's <Provider /> at the app root?"
        )
      }

      const combinedRule = _felaRule ? combineRules(rule, _felaRule) : rule

      // compose passThrough props from arrays or functions
      const resolvedPassThrough = [
        ...resolvePassThrough(passThroughProps, ruleProps),
        ...resolvePassThrough(passThrough, ruleProps)
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
        componentProps.style = ruleProps.style
        const cls = ruleProps.className ? `${ruleProps.className} ` : ''
        componentProps.className = cls +
          renderer.renderRule(combinedRule, ruleProps)
      }

      componentProps.id = ruleProps.id
      componentProps.ref = ruleProps.innerRef

      const customType = ruleProps.is || type
      return createElement(customType, componentProps, children)
    }

    if (contextTypes) {
      FelaComponent.contextTypes = contextTypes
    }

    // use the rule name as display name to better debug with react inspector
    FelaComponent.displayName = rule.name ? rule.name : 'FelaComponent'
    FelaComponent._isFelaComponent = true

    return FelaComponent
  }
}
