import isMediaQuery from '../../../modules/renderer/utils/isMediaQuery'

describe('Checking if a property is a media query string', () => {
  it('should return true', () => {
    expect(isMediaQuery('@media (min-height: 200px)')).to.eql(true)
    expect(isMediaQuery('@media(min-height: 200px)')).to.eql(true)
    expect(isMediaQuery('@media screen')).to.eql(true)
  })

  it('should return false', () => {
    expect(isMediaQuery(':hover')).to.eql(false)
    expect(isMediaQuery('property')).to.eql(false)
  })
})
