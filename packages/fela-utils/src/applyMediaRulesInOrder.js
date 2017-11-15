/* @flow */
import reduce from 'lodash/reduce'

type MediaMap = { [mediaQuery: string]: any }

export default function applyMediaRulesInOrder(order: Array<string>): MediaMap {
  return reduce(
    order,
    (mediaMap, query) => {
      mediaMap[query] = ''
      return mediaMap
    },
    {}
  )
}
