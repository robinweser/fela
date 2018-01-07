/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'

type MediaMap = { [mediaQuery: string]: any }

export default function applyKeysInOrder(
  order: Array<string>,
  initialValue: any = ''
): MediaMap {
  return arrayReduce(
    order,
    (mediaMap, query) => {
      mediaMap[query] = initialValue
      return mediaMap
    },
    {}
  )
}
