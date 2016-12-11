import isAttributeSelector from '../../modules/utils/isAttributeSelector'

describe('Validating attribute selectors', () => {
  it('should return true', () => {
    expect(isAttributeSelector('[foo=true]')).to.eql(true)
  })

  it('should return false', () => {
    expect(isAttributeSelector('color')).to.eql(false)
    expect(isAttributeSelector(':hover')).to.eql(false)
  })
})
