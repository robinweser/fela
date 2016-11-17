import { createElement, PropTypes } from 'react'

export default function createComponent(rule, type = 'div', passThroughProps = {}) {
  const component = ({ children, className, style, ...felaProps }, { renderer }) => {

    // filter props to extract props to pass through
    const componentProps = Object.keys(passThroughProps).reduce((output, prop) => {
      output[prop] = felaProps[prop]
      if (!passThroughProps[prop]) {
        delete felaProps[prop]
      }
      return output
    }, { })

    componentProps.style = style

    const cls = className ? className + ' ' : ''
    componentProps.className = cls + renderer.renderRule(rule, felaProps)

    return createElement(type, componentProps, children)
  }

  component.contextTypes = { renderer: PropTypes.object }

  // use the rule name as display name to better debug with react inspector ( see #99 )
  component.displayName = rule.name && rule.name || 'FelaComponent'

  return component
}
