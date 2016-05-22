import camelToDashCase from '../../modules/utils/camelToDashCase'

describe('Converting camel case to dash case properties', () => {
  it('should output dash cased properties', () => {
    expect(camelToDashCase('fontSize')).to.eql('font-size')
  })

  it('should convert vendor prefixes', () => {
    expect(camelToDashCase('WebkitJustifyContent')).to.eql('-webkit-justify-content')
    expect(camelToDashCase('msFlexAlign')).to.eql('-ms-flex-align')
  })
})
