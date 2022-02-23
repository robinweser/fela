import { objectReduce } from 'fast-loops'

export default function mapValueToMediaQuery(queryValueMap = {}, mapper) {
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
