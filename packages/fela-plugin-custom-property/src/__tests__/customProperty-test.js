import customProperty from '../index'

describe('Custom property plugin', () => {
  it('should resolve custom properties', () => {
    const position = positions => ({
      top: positions[0],
      right: positions[1],
      bottom: positions[2],
      left: positions[3],
    })

    const style = {
      width: 20,
      position: [0, 20, 50, 20],
    }

    expect(customProperty({ position })(style)).toEqual({
      width: 20,
      top: 0,
      right: 20,
      bottom: 50,
      left: 20,
    })
  })

  it('should resolve nested style objects', () => {
    const position = positions => ({
      top: positions[0],
      right: positions[1],
      bottom: positions[2],
      left: positions[3],
    })

    const style = {
      width: 20,
      onHover: {
        position: [0, 20, 50, 20],
      },
    }

    expect(customProperty({ position })(style)).toEqual({
      width: 20,
      onHover: {
        top: 0,
        right: 20,
        bottom: 50,
        left: 20,
      },
    })
  })

  it('should not remove resolved properties', () => {
    const padding = value => ({ padding: value })

    const style = {
      padding: '1em',
    }

    expect(customProperty({ padding })(style)).toEqual({
      padding: '1em',
    })
  })

  it('should not resolve nested style objects if property was removed', () => {
    expect(
      customProperty({
        padding: ({ t, l, b, r }) => {
          const obj = {}

          if (t != null) obj.paddingTop = t
          if (l != null) obj.paddingLeft = l
          if (b != null) obj.paddingBottom = b
          if (r != null) obj.paddingRight = r

          return obj
        },
      })({ padding: { l: '1px' } })
    ).toEqual({ paddingLeft: '1px' })
  })
})
