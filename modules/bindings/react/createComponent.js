import { createElement, PropTypes } from 'react'

export default function createComponent(rule, type = 'div', passThroughProps = {}) {
  const FelaComponent = ({ children, className, style, passThrough, ...felaProps }, { renderer, theme, flat }) => {

    // filter props to extract props to pass through
    const componentProps = Object.keys({
      ...passThroughProps,
      ...passThrough
    }).reduce((output, prop) => {
      output[prop] = felaProps[prop]
      if (!passThroughProps[prop]) {
        delete felaProps[prop]
      }
      return output
    }, { })

    componentProps.style = style

    const cls = className ? className + ' ' : ''
    componentProps.className = cls + renderer.renderRule(rule, {
      ...(flat && theme),
      ...felaProps,
      theme: (!flat && theme) || { }
    })

    return createElement(type, componentProps, children)
  }

  FelaComponent.contextTypes = {
    renderer: PropTypes.object,
    theme: PropTypes.object,
    flat: PropTypes.bool
  }

  // use the rule name as display name to better debug with react inspector
  FelaComponent.displayName = rule.name && rule.name || 'FelaComponent'
  return FelaComponent
}
