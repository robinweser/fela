import checkFontFormat from '../../modules/utils/checkFontFormat'

describe('Checking the font format', () => {
  it('should return the correct format', () => {
    expect(checkFontFormat('foo.ttf')).to.eql('truetype')
    expect(checkFontFormat('foo.eot')).to.eql('eot')
  })

  it('should return undefined', () => {
    expect(checkFontFormat('foobar.png')).to.eql(undefined)
  })
})
