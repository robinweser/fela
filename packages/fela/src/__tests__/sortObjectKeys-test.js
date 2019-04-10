import sortObjectKeys from '../sortObjectKeys'

describe('Sorting object keys', () => {
  it('should sort keys in an object', () => {
    const input = { b: 2, a: 1 }

    expect(JSON.stringify(input)).not.toEqual('{"a":1,"b":2}')
    expect(JSON.stringify(sortObjectKeys(input))).toEqual('{"a":1,"b":2}')
  })
})
