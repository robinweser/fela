/* @flow */
export default function insertAtIndex(
  arr: Array<any>,
  el: any,
  index: number
): Array<any> {
  return [...arr.slice(0, index), el, ...arr.slice(index, arr.length)]
}
