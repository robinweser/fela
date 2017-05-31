import important from '../index'

describe('Important plugin', () => {
  it('should add !important to every number and string', () => {
    const style = {
      color: 'blue',
      fontSize: 15
    }

    expect(important()(style)).toEqual({
      color: 'blue!important',
      fontSize: '15!important'
    })
  })

  it('should add !important to every value in an array', () => {
    const style = {
      color: 'blue',
      fontSize: 15,
      display: ['-webkit-flex', 'flex']
    }

    expect(important()(style)).toEqual({
      color: 'blue!important',
      fontSize: '15!important',
      display: ['-webkit-flex!important', 'flex!important']
    })
  })

  it('should add !important to nested objects', () => {
    const style = {
      color: 'blue',
      fontSize: 15,
      ':hover': { color: 'red' }
    }

    expect(important()(style)).toEqual({
      color: 'blue!important',
      fontSize: '15!important',
      ':hover': { color: 'red!important' }
    })
  })
})
