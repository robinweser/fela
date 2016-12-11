import generateAnimationName from '../../modules/utils/generateAnimationName'

describe('Generating a animation name', () => {
  it('should return a valid animation name', () => {
    expect(generateAnimationName(0)).to.eql('k0')
    expect(generateAnimationName(12)).to.eql('k12')
  })
})
