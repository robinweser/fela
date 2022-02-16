import { resolveArrayValue } from 'css-in-js-utils'
import isPlainObject from 'isobject'

function resolveFallbackValues(style) {
  for (const property in style) {
    const value = style[property]

    if (Array.isArray(value)) {
      style[property] = resolveArrayValue(property, value)
    } else if (isPlainObject(value) && property !== 'fontFace') {
      style[property] = resolveFallbackValues(value)
    }
  }

  return style
}

resolveFallbackValues.optimized = (props) => {
  if (Array.isArray(props.value)) {
    props.value = resolveArrayValue(props.property, props.value)
  }

  return props
}

export default () => resolveFallbackValues
