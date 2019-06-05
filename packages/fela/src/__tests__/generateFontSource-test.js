import generateFontSource from '../generateFontSource'

describe('Generating sources source', () => {
  it('should return valid font sources with empty aliases', () => {
    expect(generateFontSource(['font.woff', 'font.ttf'])).toMatchSnapshot()
  })

  it('should return valid font sources with local aliases', () => {
    expect(
      generateFontSource(
        ['font.woff', 'font.ttf'],
        ['Times New Roman', 'Calibri']
      )
    ).toMatchSnapshot()
  })

  it('should return valid font sources with empty files', () => {
    expect(
      generateFontSource([], ['Times New Roman', 'Calibri'])
    ).toMatchSnapshot()
  })
})
