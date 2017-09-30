import isSupport from '../isSupport'

describe('Validating supports', () => {
  it('should return true', () => {
    expect(isSupport('@supports (display: grid)')).toEqual(true)
  })

  it('should return false', () => {
    expect(isSupport(':hover')).toEqual(false)
    expect(isSupport('div')).toEqual(false)
    expect(isSupport('@media (min-height: 300px)')).toEqual(false)
  })
})
