/* @flow */
import { combineRules } from 'fela'

import hoistStatics from './hoistStatics'
import extractPassThroughProps from './extractPassThroughProps'
import extractUsedProps from './extractUsedProps'
import generateSelectorPrefix from './generateSelectorPrefix'
import resolvePassThrough from './resolvePassThrough'
import resolveUsedProps from './resolveUsedProps'

export default function createComponentFactory(
  createElement: Function,
  RendererContext: any,
  FelaTheme: Function,
  withProxy: boolean = false,
  alwaysPassThroughProps: Array<string> = []
): Function {
  return function createComponent(
    rule: Function,
    type: any = 'div',
    passThroughProps: Array<string> | Function = []
  ): Function {
    const displayName = rule.name ? rule.name : 'FelaComponent'

    const FelaComponent = ({
      children,
      _felaRule,
      extend,
      innerRef,
      id,
      style,
      as,
      className,
      passThrough = [],
      ...otherProps
    }) => {
      const renderFn = renderer =>
        createElement(FelaTheme, undefined, _felaTheme => {
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
            if (typeof extend === 'function') {
              rules.push(extend)
            } else {
              rules.push(() => extend)
            }
          }
          const combinedRule = combineRules(...rules)

          // improve developer experience with monolithic renderer
          if (
            process.env.NODE_ENV !== 'production' &&
            renderer.prettySelectors
          ) {
            const componentName =
              typeof type === 'string'
                ? displayName
                : type.displayName || type.name || ''

            combinedRule.selectorPrefix = generateSelectorPrefix(componentName)
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
        })

      return createElement(RendererContext.Consumer, undefined, renderFn)
    }

    // use the rule name as display name to better debug with react inspector
    FelaComponent.displayName = displayName
    FelaComponent._isFelaComponent = true

    return hoistStatics(FelaComponent, type)
  }
}
