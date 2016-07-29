import generatePropsReference from '../../modules/utils/generatePropsReference'

describe('Generating the props reference', () => {
  it('should always return the same className with the same props', () => {
    const className1 = generatePropsReference('foobar')
    const className2 = generatePropsReference('foobar')
    expect(className1).to.eql(className2)
  })

  it('should sort props before', () => {
    const className1 = generatePropsReference({
      foo: 'bar',
      fontSize: 12
    })
    const className2 = generatePropsReference({
      fontSize: 12,
      foo: 'bar'
    })
    expect(className1).to.eql(className2)
  })
})