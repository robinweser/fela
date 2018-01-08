import rehydrateSupportRules from '../rehydrateSupportRules'

describe('Rehydrating @supports rules', () => {
  it('should rehydrate the renderer cache', () => {
    expect(
      rehydrateSupportRules(
        '@supports(display:grid){.a{color:red}.b{color:blue}}@supports(display:grid) and (display:flex){.c{color:green}}'
      )
    ).toMatchSnapshot()
  })
})
