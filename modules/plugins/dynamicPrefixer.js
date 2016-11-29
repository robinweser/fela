/* @flow weak */
import Prefixer from 'inline-style-prefixer'

export default options => {
  const prefixer = new Prefixer(options)
  const weakMapSupported = ('WeakMap' in global)
  const index = weakMapSupported && new WeakMap()
  return style => {
    let ret = index && index.get(style)
    if (!ret) {
      ret = prefixer.prefix(style)
      if (index) {
        index.set(style, ret)
      }
    }
    return ret
  }
}
