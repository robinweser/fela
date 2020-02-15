// workaround, because can't use native Array findIndex in IE https://github.com/robinweser/fela/pull/766
export default function findIndex(array, predicate) {
  var index = -1
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      index = i
      break
    }
  }
  return index
}
