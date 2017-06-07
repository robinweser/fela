/* @flow */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'

import minifyCSSString from './minifyCSSString'
import processStyleWithPlugins from './processStyleWithPlugins'

import { STATIC_TYPE } from './styleTypes'

import type NativeRenderer from '../../../flowtypes/NativeRenderer'
import type DOMRenderer from '../../../flowtypes/DOMRenderer'

export default function cssifyStaticStyle(
  staticStyle: string | Object,
  renderer: DOMRenderer | NativeRenderer
): string {
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
