/* @flow */
import reduce from 'lodash/reduce'

export default function mapValueToMediaQuery(
  queryValueMap: Object = {},
  mapper: Function | string
): Object {
  return reduce(
    queryValueMap,
    (style, value, query) => {
      if (typeof mapper === 'string') {
        style[query] = {
          [mapper]: value,
        }
      } else {
        style[query] = mapper(value)
      }

      return style
    },
    {}
  )
}
