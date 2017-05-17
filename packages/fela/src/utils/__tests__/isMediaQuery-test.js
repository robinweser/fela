import isMediaQuery from '../isMediaQuery'

describe('Validating media queries', () => {
  it('should return true', () => {
    expect(isMediaQuery('@media (min-height: 300px)')).toEqual(true)
  })

  it('should return false', () => {
    expect(isMediaQuery(':hover')).toEqual(false)
    expect(isMediaQuery('div')).toEqual(false)
  })
})
