import generateClassName from '../../modules/utils/generateClassName'

describe('Generating a className', () => {
  it('should return a unique className', () => {
    expect(generateClassName(1)).to.eql('a')
    expect(generateClassName(2)).to.eql('b')
    expect(generateClassName(53)).to.eql('ab')
    expect(generateClassName(54)).to.eql('ac')
  })

  it('should return the same className', () => {
    expect(generateClassName(1)).to.eql('a')
    expect(generateClassName(1)).to.eql('a')
  })
})
