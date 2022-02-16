import isPlainObject from 'isobject'
import { assignStyle } from 'css-in-js-utils'

function resolveSimulation(style, type, renderer, props) {
  if (props.simulate) {
    for (const property in style) {
      const value = style[property]

      if (isPlainObject(value) && props.simulate[property]) {
        const resolvedValue = resolveSimulation(value, type, renderer, props)

        assignStyle(style, resolvedValue)
        delete style[property]
      }
    }
  }

  return style
}

export default () => resolveSimulation
