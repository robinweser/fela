import { resolveArrayValue } from 'css-in-js-utils'
import isPlainObject from 'isobject'

function fallbackValuePlugin(style) {
  for (const property in style) {
    const value = style[property]

    if (Array.isArray(value)) {
      style[property] = resolveArrayValue(property, value)
    } else if (isPlainObject(value) && property !== 'fontFace') {
      style[property] = fallbackValuePlugin(value)
    }
  }

  return style
}

fallbackValuePlugin.optimized = (props) => {
  if (Array.isArray(props.value)) {
    props.value = resolveArrayValue(props.property, props.value)
  }

  return props
}

export default function fallbackValue() {
  return fallbackValuePlugin
}
