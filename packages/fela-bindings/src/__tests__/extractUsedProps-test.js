import extractUsedProps from '../extractUsedProps'

describe('Extracting used props', () => {
  it('should return used props', () => {
    expect(
      extractUsedProps(props => {
        props.foo, props.bar
      })
    ).toEqual(['foo', 'bar'])
  })

  it('should return an empty array if the rule throws an exception', () => {
    expect(
      extractUsedProps(props => {
        throw new Error('test')
      })
    ).toEqual([])
  })
})
