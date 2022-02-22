import { objectReduce, arrayEach } from 'fast-loops'
import isPlainObject from 'isobject'

function multipleSelectorsPlugin(style) {
  objectEach(style, (value, property) => {
    if (isPlainObject(value)) {
      const resolvedValue = multipleSelectorsPlugin(value)

      arrayEach(property.split(','), (selector) => {
        const key = selector.trim()

        // merge styles with base styles
        const baseStyle = style[key] || {}
        style[key] = {
          ...baseStyle,
          ...resolvedValue,
        }
      })
    } else {
      style[property] = value
    }
  })

  return style
}

export default function multipleSelectors() {
  return multipleSelectorsPlugin
}
