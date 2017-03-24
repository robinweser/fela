/* @flow */
export default function arrayEach(array: Array<any>, iterator: Function): void {
  for (let i = 0, len = array.length; i < len; ++i) {
    iterator(array[i], i)
  }
}
