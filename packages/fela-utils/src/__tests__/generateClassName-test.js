import generateClassName from '../generateClassName'

describe('Generating a className', () => {
  it('should return a unique className', () => {
    expect(generateClassName(1)).toEqual('a')
    expect(generateClassName(2)).toEqual('b')
    expect(generateClassName(53)).toEqual('b2')
    expect(generateClassName(54)).toEqual('c2')
  })

  it('should return the same className', () => {
    expect(generateClassName(1)).toEqual('a')
    expect(generateClassName(1)).toEqual('a')
  })
})
