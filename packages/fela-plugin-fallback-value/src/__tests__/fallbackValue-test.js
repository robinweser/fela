import fallbackValue from '../index'

describe('Fallback value plugin', () => {
  it('should resolve fallback value arrays to strings', () => {
    expect(
      fallbackValue()({
        property: 'width',
        value: ['-webkit-calc(20px)', 'calc(20px)'],
      })
    ).toEqual({
      property: 'width',
      value: '-webkit-calc(20px);width:calc(20px)',
    })
  })

  it('should convert properties to dash case within value', () => {
    const style = {
      marginLeft: ['-webkit-calc(20px)', 'calc(20px)'],
    }

    expect(
      fallbackValue()({
        property: 'marginLeft',
        value: ['-webkit-calc(20px)', 'calc(20px)'],
      })
    ).toEqual({
      property: 'marginLeft',
      value: '-webkit-calc(20px);margin-left:calc(20px)',
    })
  })
})
