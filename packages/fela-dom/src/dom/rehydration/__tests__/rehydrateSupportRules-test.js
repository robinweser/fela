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

    rehydrateSupportRules(renderer, css)

    expect(renderer.cache).toEqual({
      '(display:grid)colorred': {
        className: 'a',
        selector: '.a',
        declaration: 'color:red',
        media: '',
        support: '(display:grid)',
        type: RULE_TYPE
      },
      '(display:grid)colorblue': {
        className: 'b',
        selector: '.b',
        declaration: 'color:blue',
        media: '',
        support: '(display:grid)',
        type: RULE_TYPE
      },
      '(display:grid) and (display:flex)colorgreen': {
        className: 'c',
        selector: '.c',
        declaration: 'color:green',
        media: '',
        support: '(display:grid) and (display:flex)',
        type: RULE_TYPE
      }
    })
  })
})
