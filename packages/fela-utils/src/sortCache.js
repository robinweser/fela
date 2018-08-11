import arrayReduce from 'fast-loops/lib/arrayReduce'

export default function sortCache(cache: Object, sort: Function): Object {
  const sortedKeys = Object.keys(cache).sort((left, right) =>
    sort(cache[left], cache[right])
  )

  return arrayReduce(
    sortedKeys,
    (sortedCache, key) => {
      sortedCache[key] = cache[key]
      return sortedCache
    },
    {}
  )
}
