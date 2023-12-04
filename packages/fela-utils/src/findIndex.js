// workaround, because can't use native Array findIndex in IE https://github.com/robinweser/fela/pull/766
export default function findIndex(array, predicate) {
  let index = -1
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      index = i
      break
    }
  }
  return index
}
