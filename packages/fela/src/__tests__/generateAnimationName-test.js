import generateAnimationName from '../generateAnimationName'

describe('Generating a animation name', () => {
  it('should return a valid animation name', () => {
    expect(generateAnimationName(0)).toEqual('k0')
    expect(generateAnimationName(12)).toEqual('k12')
    expect(generateAnimationName(12, 'ID')).toEqual('IDk12')
  })
})
