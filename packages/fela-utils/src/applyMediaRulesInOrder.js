/* @flow */
import arrayReduce from './arrayReduce'

type MediaMap = { [mediaQuery: string]: any }

export default function applyMediaRulesInOrder(order: Array<string>): MediaMap {
  return arrayReduce(
    order,
    (mediaMap, query) => {
      mediaMap[query] = ''
      return mediaMap
    },
    {}
  )
}
