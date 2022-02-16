import isPlainObject from 'isobject'
import { assignStyle } from 'css-in-js-utils'
import { arrayEach } from 'fast-loops'

function resolveResponsiveValues(style, properties, getMediaQueries, props) {
  for (const property in style) {
    const value = style[property]

    // resolve nested styles
    if (isPlainObject(value)) {
      style[property] = resolveResponsiveValues(
        value,
        properties,
        getMediaQueries,
        props
      )
    }

    if (properties[property]) {
      if (Array.isArray(value)) {
        const mediaQueries = getMediaQueries(value, props)

        const [defaultValue, ...mediaValues] = value
        style[property] = defaultValue

        arrayEach(mediaQueries.slice(0, mediaValues.length), (query, index) => {
          assignStyle(style, {
            [query]: {
              [property]: mediaValues[index],
            },
          })
        })
      }
    }
  }

  return style
}

export default function responsiveValue(getMediaQueries, properties = {}) {
  return (style, type, renderer, props) =>
    resolveResponsiveValues(style, properties, getMediaQueries, props)
}
