import cssifyFontFace from '../cssifyFontFace'

describe('Cssifying font faces', () => {
  it('should generate a valid CSS string', () => {
    expect(
      cssifyFontFace({
        fontFamily: '"Bar"',
        fontWeight: 300,
        src: 'url(foo/bar.ttf) format(ttf)',
      })
    ).toEqual(
      '@font-face{font-family:"Bar";font-weight:300;src:url(foo/bar.ttf) format(ttf)}'
    )
  })
})
