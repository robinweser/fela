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

    expect(renderer.cache).toEqual({
      colorred: {
        className: 'a',
        selector: '.a',
        declaration: 'color:red',
        media: '',
        support: '',
        type: RULE_TYPE
      },
      colorblue: {
        className: 'b',
        selector: '.b',
        declaration: 'color:blue',
        media: '',
        support: '',
        type: RULE_TYPE
      },
      ':hover:activeborderColor2px solid rgb(255, 255, 0)': {
        className: 'c',
        selector: '.c:hover:active',
        declaration: 'border-color:2px solid rgb(255, 255, 0)',
        media: '',
        support: '',
        type: RULE_TYPE
      }
    })
  })
})
