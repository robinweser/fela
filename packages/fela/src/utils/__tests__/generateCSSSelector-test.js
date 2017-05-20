import generateCSSSelector from '../generateCSSSelector'

describe('Generating css selectors', () => {
  it('should return a valid css selector', () => {
    expect(generateCSSSelector('foo')).toEqual('.foo')
    expect(generateCSSSelector('foo', ':hover')).toEqual('.foo:hover')
  })
})
