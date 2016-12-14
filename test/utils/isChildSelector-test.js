import isChildSelector from '../../modules/utils/isChildSelector'

describe('Validating child selectors', () => {
  it('should return true', () => {
    expect(isChildSelector('> div')).to.eql(true)
  })

  it('should return false', () => {
    expect(isChildSelector('color')).to.eql(false)
    expect(isChildSelector(':hover')).to.eql(false)
  })
})
