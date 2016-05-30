import isPseudoClass from '../../modules/utils/isPseudoClass'

describe('Checking if a property is a pseudo class string', () => {
  it('should return true', () => {
    expect(isPseudoClass(':hover')).to.eql(true)
    expect(isPseudoClass(':hover:active')).to.eql(true)
  })

  it('should return false', () => {
    expect(isPseudoClass('hover')).to.eql(false)
  })
})
