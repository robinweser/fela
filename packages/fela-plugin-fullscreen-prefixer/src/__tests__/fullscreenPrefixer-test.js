import fullscreenPrefixer from '../index'

describe('Fullscreen prefixer plugin', () => {
  it('should add fullscreen prefixes', () => {
    const style = {
      width: 20,
      ':fullscreen': {
        color: 'red',
      },
    }

    expect(fullscreenPrefixer()(style)).toEqual({
      width: 20,
      ':-webkit-full-screen': {
        color: 'red',
      },
      ':-moz-full-screen': {
        color: 'red',
      },
      ':-ms-fullscreen': {
        color: 'red',
      },
      ':full-screen': {
        color: 'red',
      },
      ':fullscreen': {
        color: 'red',
      },
    })
  })
})
