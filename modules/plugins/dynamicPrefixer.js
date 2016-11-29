/* @flow weak */
import Prefixer from 'inline-style-prefixer'

export default options => {
  const prefixer = new Prefixer(options)
  const index = new WeakMap()
  return style => {
    let ret = index.get(style)
    if (!ret) {
      ret = prefixer.prefix(style)
      index.set(style, ret)
    }
    return ret
  }
}
