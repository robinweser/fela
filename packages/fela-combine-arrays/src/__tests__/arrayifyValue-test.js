import arrayifyValue from '../arrayifyValue'

describe('Arrayifying values', () => {
  it('should return an array', () => {
    expect(arrayifyValue({ color: 'red' })).toEqual([{ color: 'red' }])
    expect(arrayifyValue(undefined)).toEqual([])
    expect(arrayifyValue(34)).toEqual([34])
    expect(arrayifyValue([1, 2])).toEqual([1, 2])
  })
})
