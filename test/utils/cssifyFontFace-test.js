import cssifyFontFace from '../../modules/utils/cssifyFontFace'

describe('Cssifying font faces', () => {
  it('should generate a valid CSS string', () => {
    expect(cssifyFontFace({
      fontFamily: '"Bar"',
      fontWeight: 300,
      src: 'url(foo/bar.ttf) format(ttf)'
    })).to.eql('@font-face{font-family:"Bar";font-weight:300;src:url(foo/bar.ttf) format(ttf)}')
  })
})
