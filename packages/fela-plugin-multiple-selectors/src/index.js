import { objectEach, arrayEach } from 'fast-loops'
import isPlainObject from 'isobject'

function multipleSelectorsPlugin(style) {
  objectEach(style, (value, property) => {
    if (isPlainObject(value)) {
      const resolvedValue = multipleSelectorsPlugin(value)

      // split on commas, but not within a relative selector list
      //   e.g. ":hover, :focus", but not ":where(:hover, :focus)"
      const selectors = property.split(/(?<!\([^)]*),(?![^(]*\))/)

      if (selectors.length > 1) {
        arrayEach(selectors, (selector) => {
          const key = selector.trim()

          // merge styles with base styles
          const baseStyle = style[key] || {}
          style[key] = {
            ...baseStyle,
            ...resolvedValue,
          }
        })

        delete style[property]
      }
    } else {
      style[property] = value
    }
  })

  return style
}

export default function multipleSelectors() {
  return multipleSelectorsPlugin
}
