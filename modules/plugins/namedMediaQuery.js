/* @flow */
function resolveNamedMediaQuery(style: Object, mediaQueryMap: Object) {
  for (const property in style) {
    const value = style[property]
    if (value instanceof Object && !Array.isArray(value)) {
      const resolvedValue = resolveNamedMediaQuery(value, mediaQueryMap)

      if (mediaQueryMap[property]) {
        style[mediaQueryMap[property]] = resolvedValue
        delete style[property]
      }
    }
  }

  return style
}

export default (mediaQueryMap: Object) =>
  (style: Object) => resolveNamedMediaQuery(style, mediaQueryMap)
