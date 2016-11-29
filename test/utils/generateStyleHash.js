import generateStyleHash from '../../modules/utils/generateStyleHash'

describe('Generating the style hash', () => {
  it('should always return the same className with the same props', () => {
    const className1 = generateStyleHash('foobar')
    const className2 = generateStyleHash('foobar')
    expect(className1).to.eql(className2)
  })
})
