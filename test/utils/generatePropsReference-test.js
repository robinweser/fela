import generatePropsReference from '../../modules/utils/generatePropsReference'

describe('Generating the props reference', () => {
  it('should always return the same className with the same props', () => {
    const className1 = generatePropsReference('foobar')
    const className2 = generatePropsReference('foobar')
    expect(className1).to.eql(className2)
  })
})