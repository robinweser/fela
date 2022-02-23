import { cssifyObject } from 'css-in-js-utils'
import { processStyleWithPlugins, STATIC_TYPE } from 'fela-utils'

import minifyCSSString from './minifyCSSString'

export default function cssifyStaticStyle(staticStyle, renderer) {
  if (typeof staticStyle === 'string') {
    return minifyCSSString(staticStyle)
  }

  const processedStaticStyle = processStyleWithPlugins(
    renderer,
    staticStyle,
    STATIC_TYPE
  )

  return cssifyObject(processedStaticStyle)
}
