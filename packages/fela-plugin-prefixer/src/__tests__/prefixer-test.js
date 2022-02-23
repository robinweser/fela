import prefixer from '../index'

describe('Prefixer plugin', () => {
  it('should prefix styles', () => {
    const style = {
      display: 'flex',
      justifyContent: 'center',
    }

    expect(prefixer()(style)).toMatchSnapshot()
  })

  it('should prefix nested objects', () => {
    const style = {
      display: 'flex',
      ':hover': {
        justifyContent: 'center',
      },
    }

    expect(prefixer()(style)).toMatchSnapshot()
  })
})

describe('Prefixer plugin (optimized)', () => {
  it('should prefix styles', () => {
    const plugin = prefixer().optimized

    expect(
      plugin({
        property: 'display',
        value: 'flex',
      })
    ).toEqual({
      property: 'display',
      value:
        '-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex',
    })

    expect(
      plugin({
        property: 'justifyContent',
        value: 'center',
      })
    ).toEqual({
      property: 'justifyContent',
      value: 'center',
    })
  })
})
