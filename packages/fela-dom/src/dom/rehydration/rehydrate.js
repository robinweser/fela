/* @flow */
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'
import { arrayEach, generateCSSSelector, RULE_TYPE } from 'fela-utils'

import rehydrateCache from './rehydrateCache'

import type DOMRenderer from '../../../../../flowtypes/DOMRenderer'

// rehydration (WIP)
// TODO: static, keyframe, font
export default function rehydrate(renderer: DOMRenderer): void {
  if (renderer.enableRehydration) {
    arrayEach(document.querySelectorAll('[data-fela-type]'), node => {
      const type = node.getAttribute('data-fela-type') || ''
      const media = node.getAttribute('media') || ''
      let css = node.textContent

      if (type === 'RULE_TYPE') {
        // try to read the uniqueRuleIdentifier
        if (media.length === 0 && css.indexOf('#*/') !== -1) {
          const [left, right] = css.split('#*/')
          renderer.uniqueRuleIdentifier = parseInt(left.split('::')[1])

          // it's ok to mutate
          css = right
        }

        renderer.cache = {
          ...rehydrateCache(css, media),
          ...renderer.cache
        }
      }
    })
  }
}
