import isMediaQuery from '../../modules/utils/isMediaQuery'

describe('Validating media queries', () => {
  it('should return true', () => {
    expect(isMediaQuery('@media (min-height: 300px)')).to.eql(true)
  })

  it('should return false', () => {
    expect(isMediaQuery(':hover')).to.eql(false)
    expect(isMediaQuery('div')).to.eql(false)
  })
})
