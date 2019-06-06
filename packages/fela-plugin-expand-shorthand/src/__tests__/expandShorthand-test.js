import expandShorthand from '../index'

describe('Expand Shorthand plugin', () => {
  it('should expand shorthands in style objects', () => {
    const style = {
      paddingLeft: '10px',
      padding: '15px',
    }

    expect(expandShorthand(false)(style)).toEqual({
      paddingLeft: '15px',
      paddingRight: '15px',
      paddingTop: '15px',
      paddingBottom: '15px',
    })
  })

  it('should expand and merge shorthands in style objects', () => {
    const style = {
      paddingLeft: '10px',
      padding: '15px',
    }

    expect(expandShorthand(true)(style)).toEqual({
      paddingLeft: '10px',
      paddingRight: '15px',
      paddingTop: '15px',
      paddingBottom: '15px',
    })
  })
})
