/* @flow */
import arrayEach from 'fast-loops/lib/arrayEach'
import { RULE_TYPE, getRuleScore } from 'fela-utils'

import rehydrateSupportRules from './rehydration/rehydrateSupportRules'
import rehydrateRules from './rehydration/rehydrateRules'
import calculateNodeScore from './connection/calculateNodeScore'

import render from './render'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'

const CLASSNAME_REGEX = /[.][a-z0-9_-]*/gi

// rehydration (WIP)
// TODO: static, keyframe, font
export default function rehydrate(renderer: DOMRenderer): void {
  render(renderer)

  arrayEach(document.querySelectorAll('[data-fela-type]'), node => {
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
      renderer.nodes[reference] = {
        score: calculateNodeScore(
          { type, media, support },
          renderer.mediaQueryOrder
        ),
        node,
      }

      if (type === RULE_TYPE) {
        if (support) {
          rehydrateSupportRules(css, media, renderer.cache)
        } else {
          rehydrateRules(css, media, '', renderer.cache)
        }

        arrayEach(node.sheet.cssRules, rule => {
          const selectorText = rule.conditionText
            ? rule.cssRules[0].selectorText
            : rule.selectorText

          rule.score = getRuleScore(
            renderer.ruleOrder,
            selectorText.split(CLASSNAME_REGEX)[1]
          )
        })
      }
    }
  })
}
