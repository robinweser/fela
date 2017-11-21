import friendlyPseudoClass from '../index'

describe('Friendly pseudo class plugin', () => {
  it('should replace friendly with valid pseudo classes', () => {
    const style = {
      width: 20,
      onHover: {
        color: 'red',
      },
    }

    expect(friendlyPseudoClass()(style)).toEqual({
      width: 20,
      ':hover': {
        color: 'red',
      },
    })
  })

  it('should resolve nested pseudo class objects', () => {
    const style = {
      width: 20,
      onHover: {
        width: 30,
        onFocus: {
          color: 'red',
        },
      },
    }

    expect(friendlyPseudoClass()(style)).toEqual({
      width: 20,
      ':hover': {
        width: 30,
        ':focus': {
          color: 'red',
        },
      },
    })
  })

  it('should resolve nested media objects', () => {
    const style = {
      width: 20,
      '@media (min-height: 300px)': {
        width: 30,
        onFocus: {
          color: 'red',
          onHover: {
            color: 'blue',
          },
        },
      },
    }

    expect(friendlyPseudoClass()(style)).toEqual({
      width: 20,
      '@media (min-height: 300px)': {
        width: 30,
        ':focus': {
          color: 'red',
          ':hover': {
            color: 'blue',
          },
        },
      },
    })
  })
})
