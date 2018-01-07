/* @flow */
import { combineRules } from 'fela'
import reduce from 'lodash/reduce'

import hoistStatics from './hoistStatics'
import extractPassThroughProps from './extractPassThroughProps'
import extractUsedProps from './extractUsedProps'
import resolvePassThrough from './resolvePassThrough'
import resolveUsedProps from './resolveUsedProps'

export default function createComponentFactory(
  createElement: Function,
  withTheme: Function,
  ProgressiveStyle: Function,
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
        const componentName =
          typeof type === 'string' ? type : type.displayName || type.name || ''

        combinedRule.selectorPrefix = `${displayName}_${componentName}__`
      }
      // compose passThrough props from arrays or functions
      const resolvedPassThrough = [
        ...alwaysPassThroughProps,
        ...resolvePassThrough(passThroughProps, otherProps),
        ...resolvePassThrough(passThrough, otherProps),
        ...(withProxy ? resolveUsedProps(usedProps, otherProps) : []),
      ]

      const ruleProps = {
        ...otherProps,
        theme: _felaTheme,
        as,
        id,
      }

      // if the component renders into another Fela component
      // we pass down the combinedRule as well as both
      if (type._isFelaComponent) {
        return createElement(
          type,
          {
            _felaRule: combinedRule,
            passThrough: resolvedPassThrough,
            innerRef,
            style,
            className,
            as,
            id,
            ...otherProps,
          },
          children
        )
      }

      const componentProps = extractPassThroughProps(
        resolvedPassThrough,
        otherProps
      )

      if (id) {
        componentProps.id = id
      }

      if (innerRef) {
        componentProps.ref = innerRef
      }

      const previousCache = { ...renderer.cache }

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

      const customType = as || type
      const element = createElement(customType, componentProps, children)

      if (renderer.isProgressiveRenderer) {
        const cacheEntries = reduce(
          renderer.cache,
          (entries, value, key) => {
            if (!previousCache.hasOwnProperty(key)) {
              entries.push(value)
            }

            return entries
          },
          []
        )

        return [
          createElement(ProgressiveStyle, {
            cacheEntries,
            renderer
          }),
          element
        ]
      }

      return element
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
