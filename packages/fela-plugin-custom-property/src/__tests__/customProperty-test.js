import customProperty from '../index'

describe('Custom property plugin', () => {
  it('should resolve custom properties', () => {
    const position = positions => ({
      top: positions[0],
      right: positions[1],
      bottom: positions[2],
      left: positions[3]
    })

    const style = {
      width: 20,
      position: [0, 20, 50, 20]
    }

    expect(customProperty({ position })(style)).toEqual({
      width: 20,
      top: 0,
      right: 20,
      bottom: 50,
      left: 20
    })
  })

  it('should resolve nested style objects', () => {
    const position = positions => ({
      top: positions[0],
      right: positions[1],
      bottom: positions[2],
      left: positions[3]
    })

    const style = {
      width: 20,
      onHover: {
        position: [0, 20, 50, 20]
      }
    }

    expect(customProperty({ position })(style)).toEqual({
      width: 20,
      onHover: {
        top: 0,
        right: 20,
        bottom: 50,
        left: 20
      }
    })
  })
})
