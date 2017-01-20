import isNestedSelector from '../../modules/utils/isNestedSelector'

describe('Validating nested selectors', () => {
  it('should return true', () => {
    expect(isNestedSelector(':hover')).to.eql(true)
    expect(isNestedSelector('[foo="true"]')).to.eql(true)
    expect(isNestedSelector('> div')).to.eql(true)
    expect(isNestedSelector('& .foo')).to.eql(true)
    expect(isNestedSelector('& ~ #id')).to.eql(true)
  })

  it('should return false', () => {
    expect(isNestedSelector('.foo')).to.eql(false)
    expect(isNestedSelector(' .foo')).to.eql(false)
    expect(isNestedSelector('~ #id')).to.eql(false)
  })
})
