/* @flow */
import { extractSupportQuery } from 'fela-utils'

import rehydrateRules from './rehydrateRules'

const SUPPORT_REGEX = /@supports[^{]+\{([\s\S]+?})\s*}/g

export default function rehydrateSupportRules(
  css: string,
  media: string = ''
): Object {
  const supportCache = {}
  let ruleCss = css

  let decl

  while ((decl = SUPPORT_REGEX.exec(css))) {
    const [ruleSet, rules] = decl

    const support = extractSupportQuery(ruleSet)
    ruleCss = ruleCss.replace(ruleSet, '')

    rehydrateRules(supportCache, rules, media, support)
  }

  return {
    ruleCss,
    supportCache
  }
}
