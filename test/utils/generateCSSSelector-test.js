import generateCSSSelector from '../../modules/utils/generateCSSSelector'

describe('Generating css selectors', () => {
  it('should return a valid css selector', () => {
    expect(generateCSSSelector('foo')).to.eql('.foo')
    expect(generateCSSSelector('foo', ':hover')).to.eql('.foo:hover')
  })
})
