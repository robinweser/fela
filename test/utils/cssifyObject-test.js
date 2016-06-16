import cssifyObject from '../../modules/utils/cssifyObject'

describe('Cssifying objects', () => {
  it('should generate a valid CSS string', () => {
    const styles = { color: 'red' }
    expect(cssifyObject({ color: 'red' })).to.eql('color:red')
  })

  it('should convert properties to dash case', () => {
    expect(cssifyObject({ fontSize: '12px' })).to.eql('font-size:12px')
  })

  it('should separate declarations with semicolons', () => {
    expect(cssifyObject({ fontSize: '12px', color: 'red' })).to.eql('font-size:12px;color:red')
  })

  it('should convert vendor prefixes', () => {
    expect(cssifyObject({
      WebkitJustifyContent: 'center',
      msFlexAlign: 'center'
    })).to.eql('-webkit-justify-content:center;-ms-flex-align:center')
  })
})
