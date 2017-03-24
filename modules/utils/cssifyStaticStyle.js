/* @flow */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

import minifyCSSString from './minifyCSSString'
import processStyleWithPlugins from './processStyleWithPlugins'

import { STATIC_TYPE } from './styleTypes'

export default function cssifyStaticStyle(
  staticStyle: string | Object,
  plugins: Array<Function>
): string {
  if (typeof staticStyle === 'string') {
    return minifyCSSString(staticStyle)
  }

  const processedStaticStyle = processStyleWithPlugins(
    plugins,
    staticStyle,
    STATIC_TYPE
  )
  return cssifyObject(processedStaticStyle)
}
