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

  it('handles css property values with line breaks correctly', () => {
    const style = {
      display: 'flex',
      backgroundImage: `linear-gradient(90deg,
      rgba(255,255,255, 0) 0,
      red 40%,
      red 60%,
      rgba(255,255,255, 0)
    )`,
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

  it('handles css property values with line breaks correctly', () => {
    const plugin = prefixer().optimized
    expect(
      plugin({
        property: 'backgroundImage',
        value: `linear-gradient(90deg,
      rgba(255,255,255, 0) 0,
      red 40%,
      red 60%,
      rgba(255,255,255, 0)
    )`,
      })
    ).toEqual({
      property: 'WebkitBackgroundImage',
      value: `linear-gradient(90deg,
      rgba(255,255,255, 0) 0,
      red 40%,
      red 60%,
      rgba(255,255,255, 0)
    );background-image:linear-gradient(90deg,
      rgba(255,255,255, 0) 0,
      red 40%,
      red 60%,
      rgba(255,255,255, 0)
    )`,
    })
  })
})
