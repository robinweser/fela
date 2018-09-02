import extractUsedProps from '../extractUsedProps'

describe('Extracting used props', () => {
  it('should return used props', () => {
    expect(
      extractUsedProps(props => ({
        foo: props.foo,
        bar: props.bar,
      }))
    ).toEqual(['foo', 'bar'])
  })

  it('should return an empty array if the rule throws an exception', () => {
    expect(
      extractUsedProps(() => {
        throw new Error('test')
      })
    ).toEqual([])
  })
})
