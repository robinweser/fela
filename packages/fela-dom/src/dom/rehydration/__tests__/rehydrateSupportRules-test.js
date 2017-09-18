import { RULE_TYPE } from 'fela-utils'

import rehydrateSupportRules from '../rehydrateSupportRules'

describe('Rehydrating @supports rules', () => {
  it('should rehydrate the renderer cache', () => {
    const renderer = {
      cache: {},
      getNextRuleIdentifier() {
        return true
      }
    }

    const css =
      '@supports(display:grid){.a{color:red}.b{color:blue}}@supports(display:grid) and (display:flex){.c{color:green}}'

    const { supportCache } = rehydrateSupportRules(renderer, css)

    expect(JSON.stringify(supportCache, null, 2)).toMatchSnapshot()
  })
})
