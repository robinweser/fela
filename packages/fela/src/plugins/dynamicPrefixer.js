/* @flow  */
import Prefixer from 'inline-style-prefixer'

export default function dynamicPrefixer(options: Object) {
  const prefixer = new Prefixer(options)

  return (style: Object) => prefixer.prefix(style)
}
