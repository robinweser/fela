import rehydrateRules from '../rehydrateRules'

describe('Rehydrating rules', () => {
  it('should rehydrate the renderer cache', () => {
    expect(
      rehydrateRules(
        '.a{color:red}.b{color:blue}.c:hover:active{border-color:2px solid rgb(255, 255, 0)}'
      )
    ).toMatchSnapshot()
  })
  it('should rehydrate the renderer cache with specifity prefix', () => {
    expect(
      rehydrateRules(
        '.parentClass .a{color:red}.parentClass .b{color:blue}.parentClass .c:hover:active{border-color:2px solid rgb(255, 255, 0)}',
        '',
        '',
        {},
        '.parentClass '
      )
    ).toMatchSnapshot()
  })
})
