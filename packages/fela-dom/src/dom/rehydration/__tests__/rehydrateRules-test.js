import rehydrateRules from '../rehydrateRules'

describe('Rehydrating rules', () => {
  it('should rehydrate the renderer cache', () => {
    expect(
      rehydrateRules(
        '.a{color:red}.b{color:blue}.c:hover:active{border-color:2px solid rgb(255, 255, 0)}'
      )
    ).toMatchSnapshot()
  })

  it('should rehydrate prioritized longhand rules', () => {
    expect(
      rehydrateRules(
        '.a.a{padding-left:20px}.b{padding:10px}.c.c.c:hover{color:red}'
      )
    ).toMatchSnapshot()
  })

  it('should rehydrate css custom properties', () => {
    expect(rehydrateRules('.a{--custom-property:12px}')).toMatchSnapshot()
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

  it.only('should rehydrate additional class names correctly', () => {
    expect(
      rehydrateRules(
        '.a.rc-tooltip.rc-tooltip-placement-topRight{padding-left:20px}'
      )
    ).toMatchSnapshot()
  })
})
