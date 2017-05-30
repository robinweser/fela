/* @flow */
export default function arrayReduce(
  array: any,
  iterator: Function,
  initialValue: any
) {
  for (let i = 0, len = array.length; i < len; ++i) {
    initialValue = iterator(initialValue, array[i])
  }

  return initialValue
}
