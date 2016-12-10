import toCSSString from '../../modules/utils/toCSSString'

describe('Transforming strings to CSSStrings', () => {
  it('should wrap strings in double quotes', () => {
    expect(toCSSString('Arial')).to.eql('"Arial"')
  })

  it('should not add additional double quotes', () => {
    expect(toCSSString('"Arial"')).to.eql('"Arial"')
  })
})
