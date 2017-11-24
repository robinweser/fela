/* @flow */
import forEach from 'lodash/forEach'
import { RULE_TYPE } from 'fela-utils'

import rehydrateSupportRules from './rehydrateSupportRules'
import rehydrateRules from './rehydrateRules'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'

// rehydration (WIP)
// TODO: static, keyframe, font
export default function rehydrate(renderer: DOMRenderer): void {
  forEach(document.querySelectorAll('[data-fela-type]'), node => {
    const rehydrationAttribute =
      node.getAttribute('data-fela-rehydration') || -1
    const rehydrationIndex = parseInt(rehydrationAttribute)

    // skip rehydration if no rehydration index is set
    // this index is set to -1 if something blocks rehydration
    if (rehydrationIndex !== -1) {
      const type = node.getAttribute('data-fela-type') || ''
      const media = node.getAttribute('media') || ''
      const support = node.getAttribute('data-fela-support')
      const css = node.textContent

      renderer.uniqueRuleIdentifier = rehydrationIndex

      if (type === RULE_TYPE) {
        if (support) {
          rehydrateSupportRules(css, media, renderer.cache)
        } else {
          rehydrateRules(css, media, '', renderer.cache)
        }
      }
    }
  })
}
