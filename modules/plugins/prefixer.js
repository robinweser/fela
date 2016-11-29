/* @flow weak */
import prefix from 'inline-style-prefixer/static'

export default () => {
  const index = ('WeakMap' in global) && new WeakMap()
  return style => {
    let ret = index && index.get(style)
    if (!ret) {
      ret = prefix(style)
      if (index) {
        index.set(style, ret)
      }
    }
    return ret
  }
}
