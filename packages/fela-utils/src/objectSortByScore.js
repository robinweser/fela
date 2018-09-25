/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'
import objectReduce from 'fast-loops/lib/objectReduce'

import insertAtIndex from './insertAtIndex'

// TODO: we can further improve this one
export default function objectSortByScore(
  obj: Object,
  getScore: Function
): Object {
  const sortedKeys = objectReduce(
    obj,
    (sortedKeys, value, key) => {
      const index = sortedKeys.findIndex(
        el => getScore(obj[el], el) > getScore(value, key)
      )

      if (index !== -1) {
        return insertAtIndex(sortedKeys, key, index)
      }

      return [...sortedKeys, key]
    },
    []
  )

  return arrayReduce(
    sortedKeys,
    (sortedObj, key) => {
      sortedObj[key] = obj[key]
      return sortedObj
    },
    {}
  )
}
