/* @flow */
import extractSupportQuery from './extractSupportQuery'
import rehydrateRules from './rehydrateRules'

const SUPPORT_REGEX = /@supports[^{]+\{([\s\S]+?})\s*}/gi

export default function rehydrateSupportRules(
  css: string,
  media?: string = '',
  cache?: Object = {}
): Object {
  let decl

  // eslint-disable-next-line no-cond-assign
  while ((decl = SUPPORT_REGEX.exec(css))) {
    const [ruleSet, cssRules] = decl

    const supportQuery = extractSupportQuery(ruleSet)
    rehydrateRules(cssRules, media, supportQuery, cache)
  }

  return cache
}
