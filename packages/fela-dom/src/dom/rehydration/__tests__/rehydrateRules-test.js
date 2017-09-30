import { RULE_TYPE } from 'fela-utils'

import rehydrateRules from '../rehydrateRules'

describe('Rehydrating rules', () => {
  it('should rehydrate the renderer cache', () => {
    const cache = {}

    const css =
      '.a{color:red}.b{color:blue}.c:hover:active{border-color:2px solid rgb(255, 255, 0)}'

    rehydrateRules(cache, css)

    expect(JSON.stringify(cache, null, 2)).toMatchSnapshot()
  })
})
