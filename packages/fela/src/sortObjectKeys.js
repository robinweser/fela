/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'

export default function sortObjectKeys(input: Object): Object {
  const keys = Object.keys(input)
  const sortedKeys = keys.sort((a, b) => a.localeCompare(b))

  return arrayReduce(
    sortedKeys,
    (output, key) => {
      output[key] = input[key]

      return output
    },
    {}
  )
}
