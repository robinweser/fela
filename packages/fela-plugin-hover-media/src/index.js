import isPlainObject from 'isobject'
import { assignStyle } from 'css-in-js-utils'

function resolveHoverStyles(style) {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      const resolvedValue = resolveHoverStyles(value)

      if (property === ':hover' || property === '&:hover') {
        style['@media (hover: hover)'] = {
          [property]: resolvedValue,
        }

        // Remove the old hover style
        delete style[property]
      } else {
        style[property] = resolvedValue
      }
    }
  }

  return style
}

export default () => resolveHoverStyles
