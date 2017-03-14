import prefixer from '../prefixer'

describe('Prefixer plugin', () => {
  it('should prefix styles', () => {
    const style = { display: 'flex', justifyContent: 'center' }

    expect(prefixer()(style)).toEqual({
      WebkitJustifyContent: 'center;-ms-flex-pack:center;-webkit-box-pack:center;justify-content:center',
      display: '-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex'
    })
  })

  it('should prefix nested objects', () => {
    const style = {
      display: 'flex',
      ':hover': {
        justifyContent: 'center'
      }
    }

    expect(prefixer()(style)).toEqual({
      display: '-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex',
      ':hover': {
        WebkitJustifyContent: 'center;-ms-flex-pack:center;-webkit-box-pack:center;justify-content:center'
      }
    })
  })
})
