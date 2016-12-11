/* @flow weak */
import minifyCSSString from './minifyCSSString'
import cssifyObject from './cssifyObject'
import processStyleWithPlugins from './processStyleWithPlugins'

import { STATIC_TYPE } from './styleTypes'

export default function cssifyStaticStyle(staticStyle, plugins) {
  if (typeof staticStyle === 'string') {
    return minifyCSSString(staticStyle)
  }

  const processedStaticStyle = processStyleWithPlugins(staticStyle, plugins, STATIC_TYPE)
  return cssifyObject(processedStaticStyle)
}
