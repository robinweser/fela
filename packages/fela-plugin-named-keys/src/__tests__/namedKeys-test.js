import namedKeys from '../index'

describe('Named keys plugin', () => {
  it('should replace named keys with real values', () => {
    const style = {
      width: 20,
      desktop: {
        color: 'red',
      },
    }

    expect(
      namedKeys({
        desktop: '@media (min-width: 300px)',
      })(style)
    ).toEqual({
      width: 20,
      '@media (min-width: 300px)': {
        color: 'red',
      },
    })
  })

  it('should resolve nested named keys', () => {
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
      namedKeys({
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

  it('should resolve dynamic keys from props', () => {
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
      namedKeys(props => ({
        desktop: props.theme.breakpoints.desktop,
        tablet: props.theme.breakpoints.tablet,
      }))(style, undefined, undefined, {
        theme: {
          breakpoints: {
            desktop: '@media (min-width: 300px)',
            tablet: '@media (min-width: 150px)',
          },
        },
      })
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
