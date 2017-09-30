import { RULE_TYPE } from 'fela-utils'

import rehydrateSupportRules from '../rehydrateSupportRules'

describe('Rehydrating @supports rules', () => {
  it('should rehydrate the renderer cache', () => {
    const css =
      '@supports(display:grid){.a{color:red}.b{color:blue}}@supports(display:grid) and (display:flex){.c{color:green}}.x{color:yellow}'

    const { supportCache, ruleCss } = rehydrateSupportRules(css)

    expect([JSON.stringify(supportCache, null, 2), ruleCss]).toMatchSnapshot()
  })
})
