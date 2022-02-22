import isPlainObject from 'isobject'
import { assignStyle } from 'css-in-js-utils'

function simulatePlugin(style, type, renderer, props) {
  if (props.simulate) {
    for (const property in style) {
      const value = style[property]

      if (isPlainObject(value) && props.simulate[property]) {
        const resolvedValue = simulatePlugin(value, type, renderer, props)

        assignStyle(style, resolvedValue)
        delete style[property]
      }
    }
  }

  return style
}

export default function simulate() {
  return simulatePlugin
}
