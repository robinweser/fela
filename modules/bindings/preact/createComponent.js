/* @flow weak */
import { h } from 'preact'

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
      return h(
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

    componentProps.style = ruleProps.style
    componentProps.id = ruleProps.id
    componentProps.ref = ruleProps.innerRef

    const customType = ruleProps.is || type
    const cls = ruleProps.className ? `${ruleProps.className} ` : ''
    ruleProps.theme = theme || {}

    componentProps.className = cls + renderer.renderRule(combinedRule, ruleProps)
    return h(customType, componentProps, children)
  }

  // use the rule name as display name to better debug with react inspector
  FelaComponent.displayName = rule.name ? rule.name : 'FelaComponent'
  FelaComponent._isFelaComponent = true

  return FelaComponent
}
