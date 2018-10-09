import { createRenderer } from 'fela'
import plugins from 'fela-preset-web'

import staticStyle from './staticStyle'

export default function getFelaRenderer() {
  const renderer = createRenderer({
    plugins,
  })

  staticStyle.forEach(rule => renderer.renderStatic(rule.style, rule.selector))

  return renderer
}
