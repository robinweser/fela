import generateStaticReference from '../generateStaticReference'

describe('Generating static style references', () => {
  it('should return a valid css selector', () => {
    expect(generateStaticReference('.foo{color:red}')).toEqual(
      '.foo{color:red}'
    )
    expect(generateStaticReference({ color: 'red' }, '.foo')).toEqual(
      '.foo{"color":"red"}'
    )
  })
})
