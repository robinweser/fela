import unit from '../index'

describe('Unit plugin', () => {
  it('should add units to number values', () => {
    const style = {
      width: 46,
      height: '34',
      lineHeight: 3.2,
      WebkitFlex: 1,
      WebkitBorderRadius: 2,
      margin: [23, '45', '3px'],
      opacity: [23, '5'],
    }

    expect(unit('px')(style)).toEqual({
      width: '46px',
      height: '34px',
      lineHeight: 3.2,
      WebkitFlex: 1,
      WebkitBorderRadius: '2px',
      margin: ['23px', '45px', '3px'],
      opacity: [23, '5'],
    })
  })

  it('should add units to nested style objects', () => {
    const style = {
      width: 46,
      ':hover': {
        height: 34,
      },
    }

    expect(unit('px')(style)).toEqual({
      width: '46px',
      ':hover': {
        height: '34px',
      },
    })
  })

  it('should default to px', () => {
    const style = {
      width: 46,
    }
    expect(unit()(style)).toEqual({
      width: '46px',
    })
  })

  it('should accept units other than px', () => {
    const style = {
      width: 46,
    }
    expect(unit('em')(style)).toEqual({
      width: '46em',
    })
  })

  it('should add property specific units', () => {
    const style = {
      width: 46,
      height: 50,
      margin: 10,
      fontSize: 15,
    }
    expect(
      unit('px', {
        margin: '%',
        fontSize: 'pt',
      })(style)
    ).toEqual({
      width: '46px',
      height: '50px',
      margin: '10%',
      fontSize: '15pt',
    })
  })

  it('should not add unit to 0', () => {
    const style = {
      width: 0,
      height: '0',
    }

    expect(unit('px')(style)).toEqual({
      width: 0,
      height: '0',
    })
  })

  it('should support custom isUnitlessProperty', () => {
    const style = {
      fontSize: 15,
      height: 50,
      lineHeight: 15,
      margin: 10,
      width: 46,
      zIndex: 1,
    }

    const isUnitlessProperty = prop => prop === 'zIndex'

    expect(
      unit(
        'px',
        {
          fontSize: 'pt',
          margin: '%',
        },
        isUnitlessProperty
      )(style)
    ).toEqual({
      fontSize: '15pt',
      height: '50px',
      lineHeight: '15px',
      margin: '10%',
      width: '46px',
      zIndex: 1,
    })
  })
})
