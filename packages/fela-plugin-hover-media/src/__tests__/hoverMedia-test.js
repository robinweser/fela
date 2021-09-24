import hoverMedia from '../index'

describe('Hover media plugin', () => {
  it('should wrap hover styles', () => {
    const style = {
      color: 'red',
      ':hover': {
        color: 'blue',
      },
    }

    expect(hoverMedia()(style)).toEqual({
      color: 'red',
      '@media (hover: hover)': {
        ':hover': {
          color: 'blue',
        },
      },
    })
  })

  it('should resolve nested styles', () => {
    const style = {
      color: 'red',
      ':hover': {
        color: 'blue',
      },
      '@media (min-width: 320px)': {
        ':hover': {
          color: 'yellow',
        },
      },
    }

    expect(hoverMedia()(style)).toEqual({
      color: 'red',
      '@media (hover: hover)': {
        ':hover': {
          color: 'blue',
        },
      },
      '@media (min-width: 320px)': {
        '@media (hover: hover)': {
          ':hover': {
            color: 'yellow',
          },
        },
      },
    })
  })
})
