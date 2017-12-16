import getFontFormat from '../getFontFormat'

describe('Checking the font format', () => {
  it('should return the correct format', () => {
    expect(getFontFormat('foo.ttf')).toEqual('truetype')
    expect(getFontFormat('foo.eot')).toEqual('embedded-opentype')
    expect(getFontFormat('foo.woff')).toEqual('woff')
    expect(getFontFormat('foo.woff2')).toEqual('woff2')
    expect(getFontFormat('foo.otf')).toEqual('opentype')
    expect(getFontFormat('foo.svg')).toEqual('svg')
    expect(getFontFormat('foo.svgz')).toEqual('svg')
    expect(
      getFontFormat(
        'data:application/x-font-ttf;base64,blahblahblahblahblahblah'
      )
    ).toEqual('truetype')
  })

  it('should return an empty string', () => {
    expect(getFontFormat('foobar.png')).toEqual('')
    expect(
      getFontFormat('data:image/png;base64,blahblahblahblahblahblah')
    ).toEqual('')
  })
})
