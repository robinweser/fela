/* @flow weak */
import { createElement, PropTypes } from 'react'

// Extract props by either an array ['key1', 'key2'] or a function props => { key1: props.key1 }
const getProps = (arrOrFunc, ruleProps) => {
  const arrOrObj = typeof arrOrFunc === 'function' ? arrOrFunc(ruleProps) : arrOrFunc
  if (Array.isArray(arrOrObj)) {
    return arrOrObj.reduce((output, prop) => {
      output[prop] = ruleProps[prop]
      return output
    }, {});
  }
  return typeof arrOrObj === 'object' ? arrOrObj : {}
};

export default function createComponent(rule, type = 'div', passThroughProps = []) {
  const FelaComponent = ({ children, className, id, style, passThrough = [], ...ruleProps }, { renderer, theme }) => {

    // compose props from arrays or functions
    const componentProps = { ...getProps(passThroughProps), ...getProps(passThrough) }
 
    componentProps.style = style
    componentProps.id = id

    const cls = className ? className + ' ' : ''
    ruleProps.theme = theme || { }

    componentProps.className = cls + renderer.renderRule(rule, ruleProps)
    return createElement(type, componentProps, children)
  }

  FelaComponent.contextTypes = {
    renderer: PropTypes.object,
    theme: PropTypes.object
  }

  // use the rule name as display name to better debug with react inspector
  FelaComponent.displayName = rule.name && rule.name || 'FelaComponent'
  return FelaComponent
}
