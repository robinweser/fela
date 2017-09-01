import checkFontFormat from '../checkFontFormat'

describe('Checking the font format', () => {
  it('should return the correct format', () => {
    expect(checkFontFormat('foo.ttf')).toEqual('truetype')
    expect(checkFontFormat('foo.eot')).toEqual('embedded-opentype')
    expect(
      checkFontFormat(
        'data:application/x-font-ttf;base64,blahblahblahblahblahblah'
      )
    ).toEqual('truetype')
  })

  it('should return an empty string', () => {
    expect(checkFontFormat('foobar.png')).toEqual('')
    expect(
      checkFontFormat('data:image/png;base64,blahblahblahblahblahblah')
    ).toEqual('')
  })
})
