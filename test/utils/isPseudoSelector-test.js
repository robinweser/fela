import isPseudoSelector from '../../modules/utils/isPseudoSelector'

describe('Validating pseudo selectors', () => {
  it('should return true', () => {
    expect(isPseudoSelector(':hover')).to.eql(true)
  })

  it('should return false', () => {
    expect(isPseudoSelector('color')).to.eql(false)
    expect(isPseudoSelector('> div')).to.eql(false)
  })
})
