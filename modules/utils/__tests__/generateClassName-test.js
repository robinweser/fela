import generateClassName from '../generateClassName'

describe('Generating a className', () => {
  it('should return a unique className', () => {
    expect(generateClassName(1)).toEqual('a')
    expect(generateClassName(2)).toEqual('b')
    expect(generateClassName(53)).toEqual('bb')
    expect(generateClassName(54)).toEqual('bc')
  })

  it('should return the same className', () => {
    expect(generateClassName(1)).toEqual('a')
    expect(generateClassName(1)).toEqual('a')
  })
})
