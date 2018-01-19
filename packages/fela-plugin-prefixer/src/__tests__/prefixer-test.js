import prefixer from '../index'

describe('Prefixer plugin', () => {
  it('should prefix styles', () => {
    const style = {
      display: 'flex',
      justifyContent: 'center',
    }

    expect(prefixer()(style)).toMatchSnapshot()
  })

  it('should prefix nested objects', () => {
    const style = {
      display: 'flex',
      ':hover': {
        justifyContent: 'center',
      },
    }

    expect(prefixer()(style)).toMatchSnapshot()
  })
})
