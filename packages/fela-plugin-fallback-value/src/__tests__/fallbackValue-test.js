import fallbackValue from '../index'

describe('Fallback value plugin', () => {
  it('should resolve fallback value arrays to strings', () => {
    const style = { width: ['-webkit-calc(20px)', 'calc(20px)'] }

    expect(fallbackValue()(style)).toEqual({
      width: '-webkit-calc(20px);width:calc(20px)'
    })
  })

  it('should convert properties to dash case within value', () => {
    const style = { marginLeft: ['-webkit-calc(20px)', 'calc(20px)'] }

    expect(fallbackValue()(style)).toEqual({
      marginLeft: '-webkit-calc(20px);margin-left:calc(20px)'
    })
  })

  it('should resolve nested style objects', () => {
    const style = {
      marginLeft: ['-webkit-calc(20px)', 'calc(20px)'],
      ':hover': { width: ['-webkit-calc(20px)', 'calc(20px)'] }
    }

    expect(fallbackValue()(style)).toEqual({
      marginLeft: '-webkit-calc(20px);margin-left:calc(20px)',
      ':hover': { width: '-webkit-calc(20px);width:calc(20px)' }
    })
  })
})
