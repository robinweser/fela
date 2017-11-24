/* @flow */
import isPlainObject from 'lodash/isPlainObject'

function resolveNamedMediaQuery(style: Object, mediaQueryMap: Object) {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      const resolvedValue = resolveNamedMediaQuery(value, mediaQueryMap)

      if (mediaQueryMap.hasOwnProperty(property)) {
        style[mediaQueryMap[property]] = resolvedValue
        delete style[property]
      }
    }
  }

  return style
}

export default function namedMediaQuery(mediaQueryMap: Object) {
  return (style: Object) => resolveNamedMediaQuery(style, mediaQueryMap)
}
