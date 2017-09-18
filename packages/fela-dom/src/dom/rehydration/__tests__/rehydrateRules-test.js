import { RULE_TYPE } from 'fela-utils'

import rehydrateRules from '../rehydrateRules'

describe('Rehydrating rules', () => {
  it('should rehydrate the renderer cache', () => {
    const renderer = {
      cache: {},
      getNextRuleIdentifier() {
        return true
      }
    }

    const css =
      '.a{color:red}.b{color:blue}.c:hover:active{border-color:2px solid rgb(255, 255, 0)}'

    rehydrateRules(renderer, renderer.cache, css)

    expect(JSON.stringify(renderer.cache, null, 2)).toMatchSnapshot()
  })
})
