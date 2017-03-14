import checkFontFormat from '../checkFontFormat'

describe('Checking the font format', () => {
  it('should return the correct format', () => {
    expect(checkFontFormat('foo.ttf')).toEqual('truetype')
    expect(checkFontFormat('foo.eot')).toEqual('eot')
  })

  it('should return undefined', () => {
    expect(checkFontFormat('foobar.png')).toEqual(undefined)
  })
})
