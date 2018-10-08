/* @flow */
import {
  generateCSSRule,
  generateCSSSupportRule,
  getRuleScore,
} from 'fela-utils'

import insertRuleInDevMode from './insertRuleInDevMode'

import type { DOMRenderer } from '../../../../../flowtypes/DOMRenderer'

export default function insertRule(
  { selector, declaration, support, pseudo }: Object,
  renderer: DOMRenderer,
  node: Object
) {
  // only use insertRule in production as browser devtools might have
  // weird behavior if used together with insertRule at runtime
  if (renderer.devMode) {
    return insertRuleInDevMode(renderer, node)
  }

  try {
    const score = getRuleScore(renderer.ruleOrder, pseudo)
    const cssRules = node.sheet.cssRules

    let index = cssRules.length

    // TODO: (PERF) instead of checking the score every time
    // we could save the latest score=0 index to quickly inject
    // basic styles and only check for score!=0 (e.g. pseudo classes)
    for (let i = 0, len = cssRules.length; i < len; ++i) {
      if (cssRules[i].score > score) {
        index = i
        break
      }
    }

    const cssRule = generateCSSRule(selector, declaration)

    if (support.length > 0) {
      const cssSupportRule = generateCSSSupportRule(support, cssRule)
      node.sheet.insertRule(cssSupportRule, index)
    } else {
      node.sheet.insertRule(cssRule, index)
    }

    cssRules[index].score = score
  } catch (e) {
    console.warn(
      `An error occurred while inserting the rules into DOM.\n`,
      declaration.replace(/;/g, ';\n'),
      e
    )
  }
}
