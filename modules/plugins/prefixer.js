/* @flow weak */
import prefix from 'inline-style-prefixer/static'

export default () => {
  const index = new WeakMap()
  return style => {
    let ret = index.get(style)
    if (!ret) {
      ret = prefix(style)
      index.set(style, ret)
    }
    return ret
  }
}
