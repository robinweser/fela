/* @flow */
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'
import { arrayEach, generateCSSSelector, RULE_TYPE } from 'fela-utils'

import rehydrateSupportRules from './rehydrateSupportRules'
import rehydrateRules from './rehydrateRules'

import type DOMRenderer from '../../../../../flowtypes/DOMRenderer'

const rehydrationHandlers = {
  [RULE_TYPE]: (renderer, css, media) => {
    const { ruleCss, supportCache } = rehydrateSupportRules(
      renderer,
      css,
      media
    )
    rehydrateRules(renderer, renderer.cache, ruleCss, media)

    renderer.cache = {
      ...renderer.cache,
      ...supportCache
    }
  }
}

// rehydration (WIP)
// TODO: static, keyframe, font
export default function rehydrateCache(renderer: DOMRenderer): void {
  return arrayEach(document.querySelectorAll('[data-fela-type]'), node => {
    const type = node.getAttribute('data-fela-type') || ''
    const media = node.getAttribute('media') || ''
    const css = node.textContent

    const handler = rehydrationHandlers[type]

    if (handler) {
      handler(renderer, css, media)
    }
  })
}
