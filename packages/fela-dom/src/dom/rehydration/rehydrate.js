/* @flow */
import arrayEach from 'fast-loops/lib/arrayEach'
import { RULE_TYPE } from 'fela-utils'

import rehydrateSupportRules from './rehydrateSupportRules'
import rehydrateRules from './rehydrateRules'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'

// rehydration (WIP)
// TODO: static, keyframe, font
export default function rehydrate(renderer: DOMRenderer): void {
  arrayEach(document.querySelectorAll('[data-fela-type]'), node => {
    const type = node.getAttribute('data-fela-type') || ''
    const media = node.getAttribute('media') || ''
    const support = node.getAttribute('data-fela-support')
    const css = node.textContent

    if (type === RULE_TYPE) {
      if (support) {
        rehydrateSupportRules(css, media, renderer.cache)
      } else {
        rehydrateRules(css, media, '', renderer.cache)
      }
    }
  })
}
