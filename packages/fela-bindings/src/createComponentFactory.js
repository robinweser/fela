/* @flow */
import { combineRules } from 'fela'

import hoistStatics from './hoistStatics'
import extractPassThroughProps from './extractPassThroughProps'
import extractUsedProps from './extractUsedProps'
import resolvePassThrough from './resolvePassThrough'
import resolveUsedProps from './resolveUsedProps'

export default function createComponentFactory(
  createElement: Function,
  withTheme: Function,
  contextTypes?: Object,
  withProxy: boolean = false,
  alwaysPassThroughProps: Array<string> = []
): Function {
  return function createComponent(
    rule: Function,
    type: any = 'div',
    passThroughProps: Array<string> | Function = []
  ): Function {
    const displayName = rule.name ? rule.name : 'FelaComponent'

    const FelaComponent = (
      {
        children,
        _felaTheme,
        _felaRule,
        _felaProps = {},
        extend,
        innerRef,
        id,
        style,
        as,
        className,
        passThrough = [],
        ...otherProps
      },
      { renderer }
    ) => {
      if (!renderer) {
        throw new Error(
          "createComponent() can't render styles without the renderer in the context. Missing react-fela's <Provider /> at the app root?"
        )
      }

      const usedProps = withProxy ? extractUsedProps(rule, _felaTheme) : []

      const rules = [rule]
      if (_felaRule) {
        rules.push(_felaRule)
      }
      if (extend) {
        typeof extend === 'function'
          ? rules.push(extend)
          : rules.push(() => extend)
      }
      const combinedRule = combineRules(...rules)

      // improve developer experience with monolithic renderer
      if (process.env.NODE_ENV !== 'production' && renderer.prettySelectors) {
        const replaceUnallowedSymbolsWithUnderscore = cn =>
          cn.replace(/[^_a-z0-9-]/gi, '_')

        const componentName =
          typeof type === 'string'
            ? type
            : replaceUnallowedSymbolsWithUnderscore(
                type.displayName || type.name || ''
              )

        combinedRule.selectorPrefix = `${displayName}_${componentName}_`
      }
      // compose passThrough props from arrays or functions
      const resolvedPassThrough = [
        ...alwaysPassThroughProps,
        ...resolvePassThrough(passThroughProps, otherProps),
        ...(withProxy ? [] : resolvePassThrough(passThrough, otherProps)),
        ...(withProxy ? resolveUsedProps(usedProps, otherProps) : []),
      ]

      const ruleProps = {
        ..._felaProps,
        ...otherProps,
        theme: _felaTheme,
        as,
        id,
      }

      const componentProps = extractPassThroughProps(
        resolvedPassThrough,
        otherProps
      )

      // if the component renders into another Fela component
      // we pass down the combinedRule as well as both
      if (type._isFelaComponent) {
        return createElement(
          type,
          {
            _felaRule: combinedRule,
            _felaProps: ruleProps,
            passThrough: resolvedPassThrough,
            innerRef,
            style,
            className,
            as,
            id,
            ...componentProps,
          },
          children
        )
      }

      // fela-native support
      if (renderer.isNativeRenderer) {
        const felaStyle = renderer.renderRule(combinedRule, ruleProps)
        componentProps.style = style ? [style, felaStyle] : felaStyle
      } else {
        if (style) {
          componentProps.style = style
        }

        const cls = className ? `${className} ` : ''
        componentProps.className =
          cls + renderer.renderRule(combinedRule, ruleProps)
      }

      if (id) {
        componentProps.id = id
      }

      if (innerRef) {
        componentProps.ref = innerRef
      }

      const customType = as || type
      return createElement(customType, componentProps, children)
    }

    if (contextTypes) {
      FelaComponent.contextTypes = contextTypes
    }

    // use the rule name as display name to better debug with react inspector
    FelaComponent.displayName = displayName
    FelaComponent._isFelaComponent = true

    const themedComponent = withTheme(FelaComponent, '_felaTheme')
    return hoistStatics(themedComponent, type)
  }
}
