import unit from '../index'

describe('Unit plugin', () => {
  it('should add units to number values', () => {
    const plugin = unit('px')

    expect(
      plugin({
        property: 'width',
        value: 46,
      })
    ).toEqual({
      property: 'width',
      value: '46px',
    })
    expect(
      plugin({
        property: 'height',
        value: '34',
      })
    ).toEqual({
      property: 'height',
      value: '34px',
    })
    expect(
      plugin({
        property: 'lineHeight',
        value: 3.2,
      })
    ).toEqual({
      property: 'lineHeight',
      value: 3.2,
    })
  })

  it('should default to px', () => {
    expect(
      unit()({
        property: 'width',
        value: 46,
      })
    ).toEqual({
      property: 'width',
      value: '46px',
    })
  })

  it('should accept units other than px', () => {
    expect(
      unit('em')({
        property: 'width',
        value: 46,
      })
    ).toEqual({
      property: 'width',
      value: '46em',
    })
  })

  it('should resolve array values', () => {
    expect(
      unit()({
        property: 'margin',
        value: [23, '45', '3px'],
      })
    ).toEqual({
      property: 'margin',
      value: ['23px', '45px', '3px'],
    })
  })

  it('should add property specific units', () => {
    expect(
      unit('px', {
        margin: '%',
        fontSize: 'pt',
      })({
        property: 'margin',
        value: 10,
      })
    ).toEqual({
      property: 'margin',
      value: '10%',
    })
  })

  it('should not add unit to 0', () => {
    expect(
      unit()({
        property: 'width',
        value: 0,
      })
    ).toEqual({
      property: 'width',
      value: 0,
    })
  })

  it('should support custom isUnitlessProperty', () => {
    const isUnitlessProperty = (prop) => prop === 'zIndex'

    expect(
      unit(
        'px',
        {},
        isUnitlessProperty
      )({
        property: 'zIndex',
        value: 1,
      })
    ).toEqual({
      property: 'zIndex',
      value: 1,
    })
  })
})
