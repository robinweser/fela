import simulate from '../index'

const rendererMock = {
  _mergeStyle: Object.assign,
}

describe('Simulating nested styles', () => {
  it('should simulate pseudo classes', () => {
    const style = {
      width: 20,
      ':hover': {
        color: 'red',
      },
      ':active': {
        color: 'blue',
      },
    }

    expect(
      simulate()(style, undefined, rendererMock, {
        simulate: {
          ':hover': true,
        },
      })
    ).toEqual({
      width: 20,
      color: 'red',
      ':active': {
        color: 'blue',
      },
    })
  })

  it('should simulate media queries', () => {
    const style = {
      width: 20,
      ':hover': {
        color: 'red',
      },
      '@media (min-height: 300px)': {
        color: 'blue',
      },
    }

    expect(
      simulate()(style, undefined, rendererMock, {
        simulate: {
          '@media (min-height: 300px)': true,
          ':hover': false,
        },
      })
    ).toEqual({
      width: 20,
      color: 'blue',
      ':hover': {
        color: 'red',
      },
    })
  })

  it('should simulate multiple nested styles', () => {
    const style = {
      width: 20,
      ':hover': {
        color: 'red',
        backgroundColor: 'blue',
      },
      '@media (min-height: 300px)': {
        color: 'blue',
      },
    }

    expect(
      simulate()(style, undefined, rendererMock, {
        simulate: {
          '@media (min-height: 300px)': true,
          ':hover': true,
        },
      })
    ).toEqual({
      width: 20,
      backgroundColor: 'blue',
      color: 'blue',
    })
  })
})
