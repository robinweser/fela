import extractPassThroughProps from '../extractPassThroughProps'

describe('Extracting pass through props', () => {
  it('should return extracted props', () => {
    expect(
      extractPassThroughProps(['foo', 'bar'], { foo: 1, bar: 2, baz: 3 })
    ).toEqual({ foo: 1, bar: 2 })
  })

  it('should only extract non-undefined values', () => {
    expect(
      extractPassThroughProps(['foo', 'bar', 'foobar'], {
        foo: null,
        bar: 2,
        baz: 3,
        foobar: undefined,
      })
    ).toEqual({ foo: null, bar: 2 })
  })
})
