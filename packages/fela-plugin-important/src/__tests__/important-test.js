import important from '../index'

describe('Important plugin', () => {
  it('should add !important to every number and string which are not animated', () => {
    const style = {
      color: 'blue',
      fontSize: 15,
      animationName: 'k3',
    }

    expect(important()(style)).toEqual({
      color: 'blue',
      fontSize: 15,
      animationName: 'k3',
    })
  })

  it('should add !important to every value in an array', () => {
    const style = {
      color: 'blue',
      fontSize: 15,
      display: ['-webkit-flex', 'flex'],
    }

    expect(important()(style)).toEqual({
      color: 'blue!important',
      fontSize: '15!important',
      display: ['-webkit-flex!important', 'flex!important'],
    })
  })

  it('should add !important to nested objects', () => {
    const style = {
      color: 'blue',
      fontSize: 15,
      ':hover': {
        color: 'red',
      },
    }

    expect(important()(style)).toEqual({
      color: 'blue!important',
      fontSize: '15!important',
      ':hover': {
        color: 'red!important',
      },
    })
  })

  it('should not add duplicate !important', () => {
    const style = {
      color: 'blue!important',
    }

    expect(important()(style)).toEqual({
      color: 'blue!important',
    })
  })

  it('should add !important to only every element which is NOT keyframe (using %)', () => {
    const style = {
      '0%': {
        transform: 'scale(0)',
      },
      '100%': {
        transform: 'scale(1)',
      },
    }

    expect(important()(style)).toEqual({
      '0%': {
        transform: 'scale(0)',
      },
      '100%': {
        transform: 'scale(1)',
      },
    })
  })

  it('should add !important to only every element which is NOT keyframe(using from, to)', () => {
    const style = {
      from: {
        transform: 'scale(0)',
      },
      to: {
        transform: 'scale(1)',
      },
    }

    expect(important()(style)).toEqual({
      from: {
        transform: 'scale(0)',
      },
      to: {
        transform: 'scale(1)',
      },
    })
  })
})
