/* @flow weak */
import { createElement, PropTypes } from 'react'

// Extract props by either an array ['key1', 'key2'] or a function props => { key1: props.key1 }
const getProps = (arg, ruleProps) => {
  if (typeof arg === 'function') { // arg is a function
    return getProps(arg(ruleProps), ruleProps)
  } else if (Array.isArray(arg)) { // arg is an array
    return arg.reduce((output, prop) => {
      output[prop] = ruleProps[prop]
      return output
    }, {})
  } else if (arg && typeof arg === 'object') { // arg is an obj
    return arg
  } return {} // arg is null or something else
}

export default function createComponent(rule, type = 'div', passThroughProps) {
  const FelaComponent = ({ children, className, id, style, passThrough, ...ruleProps }, { renderer, theme }) => {

    // compose props from arrays or functions
    const componentProps = { ...getProps(passThroughProps, ruleProps), ...getProps(passThrough, ruleProps) }
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
