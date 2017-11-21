import generateClassName from '../generateClassName'

const getId = id => () => ++id

describe('Generating a className', () => {
  it('should return a unique className', () => {
    expect(generateClassName(getId(0))).toEqual('a')
    expect(generateClassName(getId(1))).toEqual('b')
    expect(generateClassName(getId(52))).toEqual('bb')
    expect(generateClassName(getId(53))).toEqual('bc')
  })

  it('should return the same className', () => {
    expect(generateClassName(getId(0))).toEqual('a')
    expect(generateClassName(getId(0))).toEqual('a')
  })

  it('should skip className if filtered out', () => {
    const filter = c => c !== 'ad'
    const renderer = {
      id: 28,
      getId() {
        return ++renderer.id
      },
    }

    expect(generateClassName(renderer.getId, filter)).toEqual('ae')
    expect(generateClassName(renderer.getId, filter)).toEqual('af')
  })
})
