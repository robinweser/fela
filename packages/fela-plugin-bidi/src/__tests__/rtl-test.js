import bidi from '../index'

describe('Bidi plugin', () => {
  const style = {
    paddingStart: 20,
    ':hover': {
      backgroundImage: 'logical url(foo/ste.png)',
    },
  }
  it('should transform styles when "flowDirection" is "ltr"', () => {
    expect(bidi('ltr')(style)).toEqual({
      paddingLeft: 20,
      ':hover': {
        backgroundImage: 'url(foo/ltr.png)',
      },
    })
  })

  it('should transform styles when "flowDirection" is "rtl"', () => {
    expect(bidi('rtl')(style)).toEqual({
      paddingRight: 20,
      ':hover': {
        backgroundImage: 'url(foo/rtl.png)',
      },
    })
  })

  it('should use the theme.direction property', () => {
    expect(
      bidi('ltr')(style, undefined, undefined, { theme: { direction: 'rtl' } })
    ).toEqual({
      paddingRight: 20,
      ':hover': {
        backgroundImage: 'url(foo/rtl.png)',
      },
    })
  })
})
