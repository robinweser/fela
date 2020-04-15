/* @flow */
import arrayEach from 'fast-loops/lib/arrayEach'
import { RULE_TYPE, KEYFRAME_TYPE, getRuleScore } from 'fela-utils'

import rehydrateSupportRules from './rehydration/rehydrateSupportRules'
import rehydrateRules from './rehydration/rehydrateRules'

import render from './render'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'
import rehydrateKeyframes from './rehydration/rehydrateKeyframes'

const CLASSNAME_REGEX = /[.][a-z0-9_-]*/gi

// TODO: static, font
export default function rehydrate(
  renderer: DOMRenderer,
  targetDocument: any = document
): void {
  render(renderer, targetDocument)

  arrayEach(targetDocument.querySelectorAll('[data-fela-type]'), node => {
    const rehydrationAttribute =
      node.getAttribute('data-fela-rehydration') || -1
    const rehydrationIndex =
      renderer.uniqueRuleIdentifier || parseInt(rehydrationAttribute, 10)

    // skip rehydration if no rehydration index is set
    // this index is set to -1 if something blocks rehydration
    if (rehydrationIndex !== -1) {
      const type = node.getAttribute('data-fela-type') || ''
      const media = node.getAttribute('media') || ''
      const support = node.getAttribute('data-fela-support') || ''
      const css = node.textContent

      renderer.uniqueRuleIdentifier = rehydrationIndex

      const reference = type + media + support
      renderer.nodes[reference] = node

      if (type === RULE_TYPE) {
        if (support) {
          rehydrateSupportRules(css, media, renderer.cache)
        } else {
          rehydrateRules(css, media, '', renderer.cache)
        }

        // On Safari, style sheets with IE-specific media queries
        // can yield null for node.sheet
        // https://github.com/robinweser/fela/issues/431#issuecomment-423239591
        if (node.sheet && node.sheet.cssRules) {
          const nodeReference = media + support

          arrayEach(node.sheet.cssRules, (rule, index) => {
            const selectorText = rule.conditionText
              ? rule.cssRules[0].selectorText
              : rule.selectorText

            const score = getRuleScore(
              renderer.ruleOrder,
              selectorText.split(CLASSNAME_REGEX)[1]
            )

            if (score === 0) {
              renderer.scoreIndex[nodeReference] = index
            }

            rule.score = score
          })
        }
      } else if (type === KEYFRAME_TYPE) {
        rehydrateKeyframes(css, renderer.cache)
      }
    }
  })
}
