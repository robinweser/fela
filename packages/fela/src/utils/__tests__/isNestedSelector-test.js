import isNestedSelector from '../isNestedSelector'

describe('Validating nested selectors', () => {
  it('should return true', () => {
    expect(isNestedSelector(':hover')).toEqual(true)
    expect(isNestedSelector('[foo="true"]')).toEqual(true)
    expect(isNestedSelector('> div')).toEqual(true)
    expect(isNestedSelector('& .foo')).toEqual(true)
    expect(isNestedSelector('& ~ #id')).toEqual(true)
  })

  it('should return false', () => {
    expect(isNestedSelector('.foo')).toEqual(false)
    expect(isNestedSelector(' .foo')).toEqual(false)
    expect(isNestedSelector('~ #id')).toEqual(false)
  })
})
