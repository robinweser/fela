/* @flow */
import rehydrateSupportRules from './rehydrateSupportRules'
import rehydrateRules from './rehydrateRules'

export default function rehydrateCache(
  css: string,
  media: string = ''
): Object {
  const { ruleCss, supportCache } = rehydrateSupportRules(css, media)

  rehydrateRules(supportCache, ruleCss, media)
  return supportCache
}
