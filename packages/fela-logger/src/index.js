/* @flow */
/* eslint-disable consistent-return, no-console */
import cssbeautify from 'cssbeautify'

import { CLEAR_TYPE } from 'fela-utils'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

function addLogger(renderer: DOMRenderer, options: Object): DOMRenderer {
  renderer.subscribe(change => {
    if (change.type === CLEAR_TYPE) {
      console.log('Cleared renderer cache.')
      return true
    }

    const selector = change.selector || change.fontFamily || change.name
    const css =
      change.declaration || change.keyframe || change.fontFace || change.css
    const formattedCSS = options.format ? cssbeautify(css) : css
    const isMedia = change.media && change.media.length > 0

    // logs all information in a group
    console.group(selector)
    if (isMedia) {
      console.log(change.media)
    }
    if (options.logCSS) {
      console.log(formattedCSS)
    }

    console.groupEnd()
  })

  return renderer
}

const defaultOptions = {
  logCSS: false,
  formatCSS: false,
}

export default function logger(options: Object = {}) {
  return (renderer: DOMRenderer) =>
    addLogger(renderer, {
      ...defaultOptions,
      ...options,
    })
}
