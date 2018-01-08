/* @flow */
import cssifyObject from 'css-in-js-utils/lib/cssifyObject'
import { processStyleWithPlugins, STATIC_TYPE } from 'fela-utils'

import minifyCSSString from './minifyCSSString'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'

export default function cssifyStaticStyle(
  staticStyle: string | Object,
  renderer: DOMRenderer
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
