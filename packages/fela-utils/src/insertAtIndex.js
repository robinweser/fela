export default function insertAtIndex(arr, el, index) {
  return [...arr.slice(0, index), el, ...arr.slice(index, arr.length)]
}
