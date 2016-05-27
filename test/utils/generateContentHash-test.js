import generateContentHash from '../../modules/utils/generateContentHash'

describe('Generating content hashes', () => {
  it('should return a hash', () => {
    expect(generateContentHash('foobarbarfoo')).to.eql('--7bmkio')
  })

  it('should always return the same hash with equal parameter', () => {
    expect(generateContentHash('foobarbarfoo')).to.eql(generateContentHash('foobarbarfoo'))
  })
})
