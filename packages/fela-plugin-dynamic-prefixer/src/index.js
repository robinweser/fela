/* @flow  */
import Prefixer from 'inline-style-prefixer'

import deprecate from './deprecate'

deprecate(`The dynamic prefixer plugin (fela-plugin-dynamic-prefixer) is deprecated, please remove it from your Fela configuration.
inline-style-prefixer will remove its dynamic version due to increasing issues with newer browers, browser detection and false prefixing.
Use the static prefixer plugin (fela-plugin-prefixer) instead. See https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-prefixer`)

export default function dynamicPrefixer(options: Object) {
  const prefixer = new Prefixer(options)

  return (style: Object) => prefixer.prefix(style)
}
