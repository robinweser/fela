/* @flow weak */
import { createElement, PropTypes } from 'react'

import extractPassThroughProps from '../../utils/extractPassThroughProps'
import resolvePassThrough from '../../utils/resolvePassThrough'
import combineRules from '../../combineRules'

export default function createComponent(rule, type = 'div', passThroughProps = []) {
  const FelaComponent = ({ children, _felaRule, passThrough = [], ...ruleProps }, { renderer, theme }) => {
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

    const componentProps = extractPassThroughProps(resolvedPassThrough, ruleProps)

    ruleProps.theme = theme || {}

    // fela-native support
    if (renderer.isNativeRenderer) {
      componentProps.style = {
        ...ruleProps.style,
        ...renderer.renderRule(combinedRule, ruleProps)
      }
    } else {
      componentProps.style = ruleProps.style
      const cls = ruleProps.className ? `${ruleProps.className} ` : ''
      componentProps.className = cls + renderer.renderRule(combinedRule, ruleProps)
    }

    componentProps.id = ruleProps.id
    componentProps.ref = ruleProps.innerRef

    const customType = ruleProps.is || type
    return createElement(customType, componentProps, children)
  }

  FelaComponent.contextTypes = {
    renderer: PropTypes.object,
    theme: PropTypes.object
  }

  // use the rule name as display name to better debug with react inspector
  FelaComponent.displayName = rule.name ? rule.name : 'FelaComponent'
  FelaComponent._isFelaComponent = true

  return FelaComponent
}
