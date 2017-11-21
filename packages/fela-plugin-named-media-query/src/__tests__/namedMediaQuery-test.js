import namedMediaQuery from '../index'

describe('Named media query plugin', () => {
  it('should replace named media queries with real media queries', () => {
    const style = {
      width: 20,
      desktop: {
        color: 'red',
      },
    }

    expect(
      namedMediaQuery({
        desktop: '@media (min-width: 300px)',
      })(style)
    ).toEqual({
      width: 20,
      '@media (min-width: 300px)': {
        color: 'red',
      },
    })
  })

  it('should resolve nested named media queries', () => {
    const style = {
      width: 20,
      tablet: {
        width: 30,
        desktop: {
          color: 'red',
        },
      },
    }

    expect(
      namedMediaQuery({
        desktop: '@media (min-width: 300px)',
        tablet: '@media (min-width: 150px)',
      })(style)
    ).toEqual({
      width: 20,
      '@media (min-width: 150px)': {
        width: 30,
        '@media (min-width: 300px)': {
          color: 'red',
        },
      },
    })
  })
})
