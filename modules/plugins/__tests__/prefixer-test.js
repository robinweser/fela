import prefixer from '../prefixer'

describe('Prefixer plugin', () => {
  it('should prefix styles', () => {
    const style = {
      display: 'flex',
      justifyContent: 'center'
    }

    expect(prefixer()(style)).toEqual({
      WebkitJustifyContent: 'center;-ms-flex-pack:center;-webkit-box-pack:center;justify-content:center',
      display: [
        '-webkit-box',
        '-moz-box',
        '-ms-flexbox',
        '-webkit-flex',
        'flex'
      ]
    })
  })

  it('should prefix nested objects', () => {
    const style = {
      display: 'flex',
      ':hover': { justifyContent: 'center' }
    }

    expect(prefixer()(style)).toEqual({
      display: [
        '-webkit-box',
        '-moz-box',
        '-ms-flexbox',
        '-webkit-flex',
        'flex'
      ],
      ':hover': { WebkitJustifyContent: 'center;-ms-flex-pack:center;-webkit-box-pack:center;justify-content:center' }
    })
  })
})
