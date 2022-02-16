import prefixer from '../index'

describe('Prefixer plugin', () => {
  it('should prefix styles', () => {
    expect(
      prefixer()({
        property: 'display',
        value: 'flex',
      })
    ).toEqual({
      property: 'display',
      value:
        '-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex',
    })

    expect(
      prefixer()({
        property: 'justifyContent',
        value: 'center',
      })
    ).toEqual({
      property: 'justifyContent',
      value: 'center',
    })
  })
})
