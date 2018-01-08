import prefixer from '../index'

describe('Prefixer plugin', () => {
  it('should prefix styles', () => {
    const style = {
      display: 'flex',
      justifyContent: 'center',
    }

    expect(prefixer()(style)).toEqual({
      justifyContent:
        'center;-webkit-box-pack:center;-webkit-justify-content:center',
      display: [
        '-webkit-box',
        '-moz-box',
        '-ms-flexbox',
        '-webkit-flex',
        'flex',
      ],
    })
  })

  it('should prefix nested objects', () => {
    const style = {
      display: 'flex',
      ':hover': {
        justifyContent: 'center',
      },
    }

    expect(prefixer()(style)).toEqual({
      ':hover': {
        justifyContent:
          'center;-webkit-box-pack:center;-webkit-justify-content:center',
      },
      display: [
        '-webkit-box',
        '-moz-box',
        '-ms-flexbox',
        '-webkit-flex',
        'flex',
      ],
    })
  })
})
