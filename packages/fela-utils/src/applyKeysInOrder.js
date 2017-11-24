/* @flow */
import reduce from 'lodash/reduce'

type MediaMap = { [mediaQuery: string]: any }

export default function applyKeysInOrder(
  order: Array<string>,
  initialValue: any = ''
): MediaMap {
  return reduce(
    order,
    (mediaMap, query) => {
      mediaMap[query] = initialValue
      return mediaMap
    },
    {}
  )
}
