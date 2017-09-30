/* @flow */
export default function objectEach(object: Object, iterator: Function): any {
  for (const key in object) {
    iterator(object[key], key)
  }
}
