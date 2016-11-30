/* @flow weak */
import { createElement, PropTypes } from 'react'

export default function createComponent(rule, type = 'div', passThroughProps = [], defaultProps = {}) {
  const FelaComponent = ({ children, className, style, passThrough = [], ...ruleProps }, { renderer, theme }) => {

    // filter props to extract props to pass through
    const componentProps = [ ...passThroughProps, ...passThrough ].reduce((output, prop) => {
      output[prop] = ruleProps[prop]
      return output
    }, { })

    componentProps.style = style

    const cls = className ? className + ' ' : ''
    defaultProps.theme = theme || { }

    componentProps.className = cls + renderer.renderRule(rule, ruleProps, defaultProps)

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
