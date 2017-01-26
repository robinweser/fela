/* eslint-disable import/no-unresolved, import/extensions */
import createElement from 'inferno-create-element'

export default function createComponent(rule, type = 'div') {
  const component = (props, { renderer }) => {
    // extract children as a special prop
    const { children, ...felaProps } = props

    return createElement(type, { className: renderer.renderRule(rule, felaProps) }, children)
  }

  return component
}
