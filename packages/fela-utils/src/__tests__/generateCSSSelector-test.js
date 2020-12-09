import generateCSSSelector from '../generateCSSSelector'

describe('Generating css selectors', () => {
  it('should return a valid css selector', () => {
    expect(generateCSSSelector('foo')).toEqual('.foo')
    expect(generateCSSSelector('foo', ':hover')).toEqual('.foo:hover')
    expect(generateCSSSelector('foo', ':hover', '.parent ')).toEqual(
      '.parent .foo:hover'
    )
    expect(generateCSSSelector('foo', ':hover', '[class|="_SiteNav"]')).toEqual(
      '[class|="_SiteNav"].foo:hover'
    )
  })

  it('should return a css selector with increased specificity', () => {
    expect(generateCSSSelector('foo', '', '', 2)).toEqual('.foo.foo')
    expect(generateCSSSelector('foo', '', '', 3)).toEqual('.foo.foo.foo')
    expect(generateCSSSelector('foo', ':hover', '', 2)).toEqual(
      '.foo.foo:hover'
    )
    expect(generateCSSSelector('foo', ':hover', '.parent ', 2)).toEqual(
      '.parent .foo.foo:hover'
    )
  })
})
