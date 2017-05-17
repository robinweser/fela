/* @flow */
export default function objectReduce(
  object: Object,
  iterator: Function,
  initialValue: any
): any {
  for (const key in object) {
    initialValue = iterator(initialValue, object[key], key)
  }

  return initialValue
}
