import isPlainObject from 'isobject'
import { assignStyle } from 'css-in-js-utils'

function resolveNamedKeys(style, keys) {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      const resolvedValue = resolveNamedKeys(value, keys)

      if (keys.hasOwnProperty(property)) {
        const resolvedKey = keys[property]
        if (style.hasOwnProperty(resolvedKey)) {
          style[resolvedKey] = assignStyle(style[resolvedKey], resolvedValue)
        } else {
          style[resolvedKey] = resolvedValue
        }

        // We clean the old keys as they're not used anymore
        delete style[property]
      }
    }
  }

  return style
}

export default function namedKeys(keys) {
  return (style, type, renderer, props = {}) =>
    resolveNamedKeys(style, keys instanceof Function ? keys(props) : keys)
}
