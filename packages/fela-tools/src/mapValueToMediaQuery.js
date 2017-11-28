/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

export default function mapValueToMediaQuery(
  queryValueMap: Object = {},
  mapper: Function | string
): Object {
  return objectReduce(
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
